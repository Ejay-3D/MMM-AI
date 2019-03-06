## MMM-AI
MMM-AI is a simple module based on a mix of MMM-NotificationTrigger & MMM-HTMLBOX from eouia that allow to have animation of 'AI' kind when the mirror is in standby mode  ( waiting for user instruction) or talking mode ( when assistant is replying ) 

### Screenshot
<pre>
    Standby animation                     Talking animation
</pre>
![](https://github.com/ejay-ibm/MMM-AI/blob/master/jarvis-standby2.gif) ![](https://github.com/ejay-ibm/MMM-AI/blob/master/jarvis-talk2.gif)





### Installation

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
            trigger: "HOTWORD_SLEEPING", // HHOTWORD_SLEEPING if you use MMM-HOTWORD  or HOTWORD_PAUSE if you use MMM-AssistantMk2
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

Sample for MMM-AssistantMk2 transcriptionHooking demo.
```javascript
{
  module: "MMM-NotificationTrigger",
  config: {
    triggers:[
      {
        trigger: "ASSISTANT_ACTION",
        triggerSenderFilter: (sender) => {
          console.log(sender)
          if (sender.name == 'MMM-AssistantMk2') {
            return true
          } else {
            return false
          }
        },
        triggerPayloadFilter: (payload) => {
          console.log(payload)
          return true
        },
        fires: [
          {
            fire:"SHOW_ALERT",
            payload: (payload) => {
              return {
                type: "notification",
                title: payload.type,
                message: payload.command
              }
            },
          },
        ],
      },
    ]
  }

},
```



### Additional Info 
All other configuration sample from eouia/MMM-HTMLBOX & eouia/MMM-NotificationTrigger are applicable to this module.
