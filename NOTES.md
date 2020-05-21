# Notes from Lessons

## Persisting auth to local storage
- **NOT SAFE**
  - vulnerable to XSS(cross-site scripting)
  - decent for developing, fast 

### Options
- Cookies
- LocalStorage

Both are very unsafe

#### LocalStorage

Simplest way is in localstorage
```js
const jwt = await login()

localStorage.setItem('jwt', jwt)

// Any script can now access the access token
localStorage.getItem('jwt')
```
Very unsafe, opens you up to XSS attacks...even encrypted, it allows for very practical decryption since your secret will be on your frontend

#### Cookies

```js
const jwt = await login()

Cookies.set('jwt', jwt)

// Any script can access the cookies
document.cookie
```
Same as localstorage, just as vulnerable

### So what do I do?

**Don't Expose the Value!**
1. Ephemeral Method
  - Log in again at every app refresh
  - PITA
  - Not user friendly
```js
window.onload = function() {
  let jwt = null

  onLogin() {
    jwt = await login()
  }

  onDataFetch() {
    if (jwt) {
      const data = fetchData(jwt)
      render(data)
    } else {
      alert('You should probably login')
    }
  }
}
```

2. Store in `httpOnly` cookie
  - cookie that can NOT be accessed by javascript
  - Serve the app with express server
  - Mirror frontend routes inside of server
    - frontend simply pings backend with data
    - backend makes the 'real' request with bearer token read from `httpOnly` cookie

(Also other ways through Ben Awad's method of having an `accessToken` stored in memory and a `refreshToken` stored in a cookie??)

