var BROKERLISTID = "broker-list"

function DoSubmit() {
  displayClearBrokers();
  runComparison();
}

function getUserValues() {
  return {
    "isa" : {
      "currentBalance": 1,
      "amountMonthly": 100,
      "tradesMonthly": 3
    },
    "sipp" : {
      "currentBalance": 1,
      "amountMonthly": 100,
      "tradesMonthly": 3
    },
    "trading" : {
      "currentBalance": 1,
      "amountMonthly": 100,
      "tradesMonthly": 3
    },
    "managmentAssistance": 2,
    "interfaceUI": 2,
    "platforms": ["app", "web"]
  }
}

function runComparison() {
  computedBrokers = []
  BROKERS.forEach(computeBroker, computedBrokers);

  computedBrokers.sort(function(a, b){return (a.fees.platform + a.fees.trading)-(b.fees.platform + b.fees.trading)});

  computedBrokers.forEach(displayBroker)
}


function _checkplatform(brokerPlatform) {
  var userPlatform = this;
  return userPlatform == brokerPlatform.type;
}

function computeBroker(broker) {
  var brokerList = this;
  var userInput = getUserValues();
  var valid = true;

  if(broker.selfmanagementrank < userInput.managmentAssistance) {
    valid = false;
  }
  
  for(var i = 0; i < userInput.platforms.length; i++) {
    let platform = userInput.platforms[i];
    console.log(broker.platforms.find(_checkplatform, platform));
    //valid = valid ? broker.platforms.find(_checkplatform, platform) : false;
  }
  //TODO: Filters: That they have the correct platforms.
  //TODO: Filters: The platforms have over the UI level.
 
  if(valid) {
    broker.fees = calculateCosts(broker, userInput);
    brokerList.push(broker);
  }
}

function calculateCosts(broker, userInput) {
  //TODO: Fees: Compute the fees for this broker. 
  return {
    "platform": 100,
    "joining": 199,
    "exit": 231,
    "trading": 234,
  };

}

function displayBroker(broker) {
// Write a broker to the screen
  brokerElement = document.getElementById(BROKERLISTID);
  //TODO: Add a nice display here
  brokerElement.innerHTML += "<div>" + broker.name + "|" + (broker.fees.platform + broker.fees.trading) + "</div>";
}

function displayClearBrokers() {
// Remove all the brokers displayed
  brokerElement = document.getElementById(BROKERLISTID);
  brokerElement.innerHTML = "";
}
