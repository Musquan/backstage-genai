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
### To know more about backstage: 
### [Backstage](https://backstage.io)

