/* Magic Mirror
* Module: MMM-AI
*
* customized and implemented by ejay From eouia work on MMM-HTMLBOX and MMM-NotificationTrigger
*/
Module.register("MMM-AI",{
	defaults: {
		width: "100%",
		height: "inherit",
		refresh_interval_sec: 0,
		content: `<img id="MY_ANIMATION" src="config/jarvis-standby2.gif"/>`,  // this can be changed in config.js
		//file: "sample.html",
	useWebhook: false,
		triggers:[
			{
				trigger: "SAMPLE_INCOMINIG_NOTIFICATION",
				triggerSenderFilter: (sender) => {
					return true
				},
				triggerPayloadFilter: (payload) => {
					return true
				},
				fires: [
					{
						fire:"SAMPLE_OUTGOING_NOTIFICATION",
						payload: (payload) => {
							return payload
						},
						delay: 0,
						exec: ""
					},
				],
			},
		]
	
	},

	start: function() {
		this.timer = null
		this.sendSocketNotification("INIT")

	},
socketNotificationReceived: function(notification, payload) {
		if (notification == "WEBHOOK" && this.config.useWebhook) {
			this.notificationReceived(payload.notification, payload.payload, payload.sender)
		}
		if (notification == "EXEC_RESULT") {
			this.sendNotification(payload.fire + "_RESULT", payload)
			console.log("[NOTTRG] Execution Result: ", payload)
		}
	},
	
	notificationReceived: function(notification, payload, sender) {
		if (notification == "DOM_OBJECTS_CREATED") {
			this.refresh()
		}
		var triggers = this.config.triggers
		for(i in triggers) {
			var trigger = triggers[i]
			if (notification == trigger.trigger) {
				var senderFilter = (trigger.triggerSenderFilter)
					? trigger.triggerSenderFilter
					: this.defaults.triggers[0].triggerSenderFilter
				var payloadFilter = (trigger.triggerPayloadFilter)
					? trigger.triggerPayloadFilter
					: this.defaults.triggers[0].triggerPayloadFilter
				if (senderFilter(sender) && payloadFilter(payload)) {
					for(j in trigger.fires) {
						var fire = trigger.fires[j]
						var result = payload
						if (typeof fire.payload == "function") {
							result = fire.payload(payload)
						} else if (fire.payload) {
							result = fire.payload
						}
						if(fire.delay) {
							setTimeout(()=>{
								this.sendNotification(fire.fire, result)
								if (fire.exec) {
									this.sendSocketNotification("EXEC", {
										trigger:trigger.trigger,
										fire: fire.fire,
										exec:fire.exec
									})
								}
							}, fire.delay)
						} else {
							this.sendNotification(fire.fire, result)
							if (fire.exec) {
								this.sendSocketNotification("EXEC", {
									trigger:trigger.trigger,
									fire: fire.fire,
									exec:fire.exec
								})
							}
						}
					}
				}
			}
		}
	},

	refresh: function() {
		if (this.config.file !== "") {
			this.readFileTrick("/modules/MMM-AI/" + this.config.file)
		}
		this.updateDom()
		if (this.config.refresh_interval_sec > 0) {
			var self = this
			this.timer = setTimeout(function(){
				self.refresh()
			}, this.config.refresh_interval_sec * 1000)
		}
	},

	getDom: function() {
		var wrapper = document.createElement("div")
		wrapper.innerHTML = this.config.content
		wrapper.className = "HTMLBX"
		wrapper.style.width = this.config.width
		wrapper.style.height = this.config.height
		return wrapper
	},

	readFileTrick: function (url, callback) {
		var xmlHttp = new XMLHttpRequest()
		var self = this
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				console.log("EEE!")
				self.config.content = xmlHttp.responseText
				self.updateDom()
			}
		}
		xmlHttp.open("GET", url, true)
		xmlHttp.send(null)
	}
})
