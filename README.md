# Booking Web service

**Steps to run application**

**Step 1: Properties file changes**

1. Open config/application.properties file and modify below properties.
2. app.queries.path=query folder path.
3. spring.datasource.url=postgres database connection url.
4. spring.datasource.username=database user name.
5. spring.datasource.password=password.

**Step 2: Modify Log file path**

Open and modify LOG_PATH property in to config/logback-spring.xml file.


**Step 3: Import project into eclipse**

Open BookingApplication.java and modify "app-config-path".

**Step 4: Restore database backup**

Restore dbbackup.backup into postgres database.

**Step 5: Run BookingApplication.java**

# Booking web application

**Step 1: npm install**
Go to **bookingui** project dir from command prompt and execute below command
npm install

**Step 2: Start Web Application**
npm start

**Step 3: Access Web Application**
http://127.0.0.1/3000/

![Screenshot](D96F6A69-0783-4D77-A438-BF458B5DD9A0_1_105_c.jpeg)
