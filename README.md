Prerequisites:
  ## 1. WSL
  Installing WSL
  ```sh
  wsl --install ubuntu
  ```
  Set up Linux user info

  Open WSL
  ```sh
  wsl
  ```
  Go to root directory
  ```sh
  cd ~
  ```
  
  ## 2. nvm and node installation

  Installing nvm :- 
  ```sh
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
  ```
  restarting the shell:-
  ```sh
  \. "$HOME/.nvm/nvm.sh"
  ```
  Command to check if nvm is installed or not - 
  ```sh
  command -v nvm
  ```
  Use the node version 20
  ```sh
  nvm install 20.19.1
  nvm use 20.19.1
  ```
  ## 3. Backstage installation
  ```sh
  npm install -g corepack
  ```
  ```sh
  git clone https://github.com/Musquan/backstage-genai.git
  ```
  ```sh
  cd backstage-genai
  ```
  To start the app, run:
  
  ```sh
  yarn install
  yarn start
  ```
  ## 4. Authenticating the backstage app using keyclock
  1. Install Docker
  2. Run the below command to start keyclock
      ```sh
      docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:21.0.2 start-dev
      ```
  3. Go to http://localhost:8080/
  4. Open Administration console. Credentials are **admin** and **admin**
  5. Select the dropdown with master and click on **Create Realm**. Upload the given realm.json file and click on Create.
  6. Now make sure the drop down is selected as "backstage-realm"
  7. Go to "Users" -> "Create new user".(Required user action - Terms and Conditions, enter your other details)
  8. Once the user is created, go to user details and set password in Credentials tab.
  9. Now select the Realm Settings in the backstage-realm. Then choose the "Keys" tab and copy the public key "Certificate" of RS256 algorithm. If not seen reduce the screen size and you'll see the certificate.
  10. Go to backstage code in vsCode. Create a new file **saml.crt** under packages folder and copy the certificate in the below format.
      ```sh
      -----BEGIN CERTIFICATE-----
      Your certificate here
      -----END CERTIFICATE-----
      ```
  ## 5. Login Backstage app
   Enter your details now in the backstage app and you are now all set to use the backstage app.
  
  
##### For clear instructions on how to set up backstage, please follow the below link: 
##### [Backstage](https://backstage.io)

