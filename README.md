## Overview

This project to interact with Hanafuda Network. Including Auto Deposit and Auto Open Grow to earn points

## Prerequisites

Before running the project, ensure you have faucet in your wallet and the following installed:

- Node.js (v14 or later)
- npm (Node package manager)

## Setup Instructions

1. **Clone the Repository**

   Clone this repository to your local machine using:

   ```bash
   git clone https://github.com/riswanda776/hnfd
   cd hnfd
2. **Install Dependencies**
   ```bash
   npm install
3. **Environment Configuration**

   Modify `.env` file in the root directory of the project with Hanafuda Token
		 
	**How To Get Token**
-   Open  [Hanafuda](https://hanafuda.hana.network/dashboard)  and login to dashboard
-   Press F12 or CTRL + SHIFT + I
-   Select Console
-   At the console, type  `allow pasting`  and press enter
-  Copy and paste this script in console and enter. the token automaticly copied in clipboard
- The token is valid only 1 hour after logging in, make sure you use a valid token otherwise the deposit will not be counted on the dashboard
	 ```javascript: (function() {
    try {
        var key = 'firebase:authUser:AIzaSyDipzN0VRfTPnMGhQ5PSzO27Cxm3DohJGY:[DEFAULT]';
        
        var data = sessionStorage.getItem(key);
        
        if (data) {
            var accessToken = JSON.parse(data).stsTokenManager.accessToken;
            
            var tempInput = document.createElement('textarea');
            tempInput.value = accessToken;
            document.body.appendChild(tempInput);
            tempInput.select();
            
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            
            alert('Copied');
        } else {
            alert('Token not found');
        }
    } catch (e) {
        alert('Error : ' + e);
    }})();

4. **Setup Wallet**
   If you use mnemonic paste your mnemonic in accounts.json or use private key put your private key in privateKeys.json

5. **Run Project**
	`npm start`