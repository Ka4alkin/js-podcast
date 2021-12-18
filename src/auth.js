export function getAuthForm() {
    return `
    <form id="auth-form" class="mui-form">
            <div class="mui-textfield mui-textfield--float-label">
                <input required id="email" type="email" >
                <label for="email">Что хочеш спросить</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input required id="password" type="password" >
                <label for="password">Пароль</label>
            </div>
            <button
                type="submit" 
                class="mui-btn mui-btn--raised mui-btn--primary">Войти</button>
    </form>
    `
}

export function authWithEmailAndPassword(email, password) {
    const apiKey = 'AIzaSyD9-xeSAMwH9A-Ae1x51ku9onmMweUfgzs'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            // email: email,
            // password: password,
            email, password,
            returnSecureToken: true
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => data.idToken)

}