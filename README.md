# openmrs-esm-hackathon-patient-search

Navbar for hackathon

## Instructions

1. `npm install`
2. Run it on a certain port, `npm start -- --https --no-inline --port 8085`
3. Go to https://openmrs-spa.org/openmsr/spa/login in a browser.
4. Now [trust all insecure localhost requests](https://superuser.com/questions/772762/how-can-i-disable-security-checks-for-localhost).
5. Open up the browser console and run the following commands:

```js
importMapOverrides.addOverride(
  "@hackathon/patient-search",
  "https://localhost:8085/patient-search.js"
);
```

6. Refresh the page.
7. Login with username `admin` and password `admin123`.
8. Modify something in the nav bar
9. In the browser, refresh the page. You should see your code modified.
