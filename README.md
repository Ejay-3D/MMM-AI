## MMM-AI
MMM-AI is a simple module based on a mix of MMM-NotificationTrigger & MMM-HTMLBOX from eouia that allow to have animation of 'AI' kind when the mirror is in standby mode  ( waiting for user instruction) or talking mode ( when assistant is replying ) triggered by Notification sent by modules. 

### Screenshot
<pre>
    Standby animation                     Talking animation
</pre>
![](https://github.com/ejay-ibm/MMM-AI/blob/master/jarvis-standby2.gif) ![](https://github.com/ejay-ibm/MMM-AI/blob/master/jarvis-talk2.gif)





### Installation

In the MagicMirror/modules directory run : 
```sh
git clone https://github.com/ejay-ibm/MMM-AI.git
```

### Configuration Sample
```javascript
{
      module: "MMM-AI",
      position: "top_center",
      config: {
        width: "300px",
        height: "300px",
        refresh_interval_sec: 0, // you should not refresh, because content will be back to default value.
        content: `<img id="MY_ANIMATION" src="modules/MMM-AI/jarvis-standby2.gif"/>`,
        triggers: [
          {
            trigger: "HOTWORD_LISTENING", // HOTWORD_LISTENING if you use MMM-HOTWORD  or HOTWORD_RESUME if you use MMM-AssistantMk2
            fires: [
              {
                fire: "standby_Image",
                payload: payload => {
                  var img = document.getElementById("MY_ANIMATION");
                  img.src = "modules/MMM-AI/jarvis-standby2.gif";
                  return payload;
                }
              }
            ]
          },
		{
            trigger: "HOTWORD_SLEEPING", // HOTWORD_SLEEPING if you use MMM-HOTWORD  or HOTWORD_PAUSE if you use MMM-AssistantMk2
            fires: [
              {
                fire: "Talk_Image",
                payload: payload => {
                  var img = document.getElementById("MY_ANIMATION");
                  img.src = "modules/MMM-AI/jarvis-talk2.gif";
                  return payload;
                }
              }
            ]
          }
        ]
      }
    },

```



### Additional Info 
All other configuration sample from https://github.com/eouia/MMM-HTMLBOX & https://github.com/eouia/MMM-NotificationTrigger are applicable to this module.

Thanks to Sean : https://github.com/eouia/  who have created this code that I have merged for this module purpose.
Animated images are created by me. 

