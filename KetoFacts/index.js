/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing ketogenic facts.
 */

var FACTS = [
    "The ketogenic diet is a special high-fat low-carb, and adequate protein diet. Because it forces the body to use fat as fuel, it is also used by people that want to lose weight and build muscle.",
    "The Ketogenic diet is commonly used to control seizures in epileptics, and is being studied as a treatment for neurological disorders like Parkinsons and Alzheimers as well.",
    "Our body usually uses Carbohydrates, or glucose, as its primary fuel. During ketosis, there is not as much glucose, so it uses fat as energy.",
    "During a Ketogenic diet, about 60 to 80% of your daily calories will come from fats. You will get about 15 to 35% of your calories from protein, and 5% from carbs.",
    "As part of a ketogenic diet, you will be eating less than 50 to 60 grams of carbohydrates a day."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * KetoFacts is a child of AlexaSkill.
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
