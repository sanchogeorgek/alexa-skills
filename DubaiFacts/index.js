/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing facts about Dubai.
 */

var FACTS = [
    "The crime rate in Dubai is so low, it is virtually 0%. That is why this city is considered one of the safest cities on earth.",
    "Dubai has no property or income tax",
    "Some of the world’s tallest and biggest structures are situated in Dubai. The biggest mall, the tallest hotel, the second largest man-made marina, and the world’s largest aquarium are all located in Dubai.",
    "The Burj Khalifa of Dubai is considered the world’s tallest man-made structure, the height of which is 2,717 feet.  The Burj Khalifa also situates the highest mosque, the highest restaurant, the highest outdoor observation deck and the highest nightclub.",
    "The Mall of the Emirates, which is located in Dubai, is famous for its indoor snow and ski resort. It features an amazing 22500 square meters of snow covered area all year around.",
    "Dubai is the second-largest city in the United Arab Emirates afer Abu Dhabi; it covers an area of 1,588.4 square miles.",
    "The majority of the population of Dubai is constituted by expatriates mainly of Asian origin. The Asian group consists of people from India, Pakistan, and Bangladesh. There is also a sizeable Somali community. The median age in the emirate is about twenty-seven years.",
    "Arabic is the official language of Dubai but English is the most commonly spoken language; it serves as the lingua franca of the city. Hindi, Urdu, Bengali, Malayalam, Tamil, Tagalog, Persian, and Chinese are also spoken.",
    "Life expectancy in Dubai is high at 77.87 years for females and 72.73 years for males. Crude birth rate is 12.8% and the infant mortality rate is at 9.2 deaths per 1000 of the population.",
    "The Palm Jumeirah in Dubai is the world’s largest artificial island and is visible from space. It adds about 520 km of shoreline to Dubai.",
    "The Dubai World Cup, an annual thoroughbred horse race, is the world's richest horse race. Its string of nine races carry a total prize money of over US$27 million. Its venue, the Meydan Racecourse, has the longest grandstand in the world with a length of 1.6 kilometres"
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * DubaiFacts is a child of AlexaSkill.
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
