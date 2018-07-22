# fatec-chatbot

- ## Scope
   Answer usual questions about FATEC Jundiaí, such as test's calendar, professor's contact, internship report etc.
   
- ## Persona
  Students and future students interested to know general information about FATEC Jundiaí.
  
- ## Use case
  - ### Chatbot workflow
    ![Chatbot workflow](/resources/img/chatbot-workFlow.png)
    ```
    1. User wants to know general question about the Fatec Jundiaí  
    2. User makes login on the Application using Gmail or Facebook
    3. User gets the information in a simple and fast way
    ```
  
- ## Technologies
  - **GitHub:** used for versioning the code and integration to devOps tools. 
  - **Cloudant:** [IBM Cloudant](https://console.bluemix.net/docs/services/Cloudant/offerings/cloudant.com.html#cloudant-com) is a hosted and fully-managed database-as-a-service (DBaaS). It was built from the ground up to scale globally, run non-stop, and handle a wide variety of data types like JSON, full-text, and geospatial. Also it is a NoSQL database, allowing highly scalable access and and free format data structure. To know more about the NoSQL db you can see this [article](https://www.infoworld.com/article/3240644/nosql/what-is-nosql-nosql-databases-explained.html).
  - **IBM Watson Conversation:** Watson API available as a service on IBM Cloud. This solution offers an Rest API and a Graphical Interface to make the dialog of the client and the robot. It is based on intents - user examples - and entities - objects of the examples - to plann a properly answer. Combined with another services and tools - Cloudant db for instance - provides an exellent way to develop a Chatter-bot application.
  - **Box:** used for pdf/images storage. As this app is going to be Cloud native, it doesn't have a storage consistency, so the [Box](https://www.box.com/home) service was choose to make the storage consistency possible.
  - **Node.js:** JavaScript runtime built on Chrome's V8 JavaScript engine for our Chatbot Back-end. To know more about Node, you can acess [here](https://nodejs.org/en/).
  - **React:** JavaScript framework for our Chatbot Front-end. It is based on our application state, allowing the time to create interactive UIs painless. Click [here](https://reactjs.org/) for more information.
  - **Bootstrap** web framework to our Chatbot Front-end for Mobile first view. For more information about Bootstrap you can see the [official documentation](https://getbootstrap.com/docs/4.1/getting-started/introduction/).
  
- ## Team
   Name                 | Email                              |Role  
   ---------------------|------------------------------------|-----------|
   Gustavo Porto Guedes | gustavo.guedes@fatec.sp.gov.br     | Developer
   Isabella Leite       | isabellacastroleite@gmail.com      | Developer
   Leticia Costa        | lrcosta2014@gmail.com              | Developer
   Humberto Zanetti     | prof.zanetti@fatec.sp.gov.br       | Advisor
  