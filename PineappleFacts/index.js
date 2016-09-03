/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing pineapple facts.
 */

var FACTS = [
    "In 1493, explorer Christopher Columbus found pineapples on Guadeloupe Island in the Caribbean and brought it back to Europe.",
    "The pineapple plant is a tropical fruit that is indigenous to South America. Originally coming from the area between southern Brazil and Paraguay.",
    "American colonists regarded pineapples as a luxurious treat because of their rarity and cost.",
    "To make your pineapple softer and juicier, keep it at room temperature for 1 or 2 days before cutting.",
    "One cup of pineapple has 70 to 85 calories.",
    "Each pineapple plant only produces just one pineapple per year.",
    "Traditionally pineapple juice was used as a diuretic and to induce labour.",
    "A pineapple is the result of many flowers whose fruitlets have joined around the core.",
    "If you want to speed up the ripening of a pineapple, so that you can eat it faster, then you can do it by standing it upside down on the leafy end.",
    "On arrival to the Americas, European explorers called the tropical fruit pineapples around 1664 because they resembled the pine cone.",
    "An individual pineapple can take over two years to grow, although they are usually picked slightly earlier than this.",
    "The top of a pineapple, after cleaning and drying, can be planted in soil and a new plant will grow.",
    "A pineapple is not an apple, or pine. Its actually a berry!",
    "In the wild, pineapple plants can live and fruit for up to 50 years.",
    "The Hawaiian word for pineapple is halakahiki.",
    "75% of all pineapples sold in Europe are grown entirely in Costa Rica.",
    "The worlds largest pineapple ever recorded was in 2011, grown by Christine McCallum from Bakewell, Australia. It measured 32cm long, 66cm girth and weighed a whopping 8.28kg!",
    "The individual fruit segments of a pineapple interlock in two helices, 8 in one direction, 13 in the other, each of which is a Fibonacci number.",
    "Pineapple juice is a popular tropical drink and it is the main ingredient in the Piña colada cocktail.",
    "High bromelain content in raw pineapple juice makes it helpful as a meat marinade and tenderizer.",
    "Raw pineapple can be a great source of manganese and vitamin C. Also bromelain is an enzyme that breaks down protein and is present in raw pineapple making the fruit useful as a digestive aid and an effective anti-inflammatory.",
    "The skins, core and ends of a pineapple are not discarded in pineapple canneries but instead used to make a number of products such as vinegar, alcohol and animal food.",
    "75% of all pineapples sold in Europe are grown entirely in Costa Rica."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * PineappleFacts is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a Ketogenic fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random keto fact from the ketogenic facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the KetoFacts skill.
    var fact = new Fact();
    fact.execute(event, context);
};
