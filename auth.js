// 1. what was the tool used before for auth? => localstorage.
// 2. signup => store data.
// 3. login => retrive and verify data.
// 4. verification logic => you.
// 5. two things for comprision.
// 6. username input (username password)
// 7. stored data on server (username and password).

// OOPS => 

import { navbar } from "./component/navbar.js";
let navbar_div = document.getElementById('navbar');
navbar_div.innerHTML = navbar();

class User {

    constructor() {

    }

    validateUsername (username) {
        // using ternery operator here.
        return username.inclides('@') ? false : true;
    }

    validatePassword(password) {
        return password.length < 8 ? false : true;
    }

    async signUP(n, e, u, p, m, d) {
        // cheak if user is submitting valid username and password.

        let isValidated = this.validateUsername(u) && this.validatePassword(p);

        if(isValidated) {
            // good to store the data.

            this.name = n;
            this.email = e;
            this.username = u;
            this.password = p;
            this.mobile = m;
            this.description = d;

            const register_api = `https://masai-api-mocker.herokuapp.com/auth/register`;

            const response =await fetch(register_api, {

                method: 'POST',
                body: JSON.stringify(this),

                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data =await response.json();
            console.log('data:', data);
            
            // nature of fetch ? function.
            // if fetch is a function does it eat -> yes.
            // first argument -> url.
            // what is the default request of fetch -> GET.
            // this time we are going to give data to the server.
        }
    }

    async Login (u, p) {

        const login_data = {
            username: u,
            password: p,
        };

        const login_api = `https://masai-api-mocker.herokuapp.com/auth/login`;

        const response = await fetch(login_api, {

            method: 'POST',
            body: JSON.stringify(login_data),

            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data =await response.JSON();
        return data;
    }
}

let user = new user();

const Register = () => {

    let reg_form = document.getElementById('reg_form');

    const name = reg_form.name.value;
    const email = reg_form.email.value;
    const username = reg_form.username.value;

    const password = reg_form.password.value;
    const mobile = reg_form.mobile.value;
    const description = reg_form.description.value;

    user.signUP(name, email, username, password, mobile, description);

    console.log('user:', user);
};


const Login =async () => {

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    let { token } =await user.Login(username, password);

    getProfile(username, token);
}

const getProfile = async (username , token) => {

    let api_link = `https://masai-api-mocker.herokuapp.com/user/${username}`;

    let response = await fetch(api_link, {

        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    let data = await response.json();
    console.log('data:', data);
};

//home page
let icon = document.getElementById("icon")
