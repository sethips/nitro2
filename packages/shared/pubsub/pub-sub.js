import ExecutionEnvironment from "exenv";

var pubSub = function(){
  var topics = {};
  var hOP = topics.hasOwnProperty;

  return {
    subscribe: function(topic, listener) {
     
      // Create the topic's object if not yet created
      if(!hOP.call(topics, topic)) topics[topic] = [];

      // Add the listener to queue
      var index = topics[topic].push(listener) -1;

      // Provide handle back for removal of topic
      return {
        remove: function() {
          delete topics[topic][index];
        }
      };
    },
    publish: function(topic, info) {
      console.log("I am pusub");
      // If the topic doesn't exist, or there's no listeners in queue, just leave
      if(!hOP.call(topics, topic)) return;

      // Cycle through topics queue, fire!
      topics[topic].forEach(function(item) {
      		item(info != undefined ? info : {});
      });
    },
    getTopics: function () {
      return topics;
    }
  };
};

var pubSubInstance;

if (ExecutionEnvironment.canUseDOM) {
  if (window.pubSub) {
    pubSubInstance = window.pubSub;
  } else {
    pubSubInstance = pubSub();
    window.pubSub = window.pubSub || pubSubInstance;
  }
} else {
  pubSubInstance = pubSub();
}

export default pubSubInstance;