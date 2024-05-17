# utils-ts

typescript | javascript utils

## Utils types

### number.formatFactory

Function for formatting a number.

Based by [Intl.NumberFormat](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).

Expect settings object.

```typescript
const enFormat = number.formatFactory({
    lang: 'en-US',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

console.log(enFormat('123, 123')) // returns 123.23
```

### async.wait

Function for wait time in [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

Expect milliseconds.

```typescript

async function myBeautyLoadingAnimation () {
    let loading = '.';
    await async.wait(500);
    loading = '..';
    await async.wait(500);
    loading = '...';
}

```

### async.debounce

Function for debounce.

Expect object argument:

- callback - function, which be called with debounce;
- timeout - number of milliseconds after which function will be called, updates after interact with function;
- initialInvoke - call callback if timer is not started;

```typescript
const search = async.debounce({
    callback: (event: Event) => {
        searchFetch(`https://api.enpoint/search?query=${event.target.value}`);
    },
    timeout: 1000
});

searchInput.oninput = search;
```

### async.throttle

Function for throttling.

Expect object argument:

- callback - function, which be called with throttle;
- timeout - number of milliseconds in which only one time callback will be called;

```typescript
const myMouseWatcher = async.throttle({
    callback: (event: Event) => {
        sendMouseStats(Event);
    },
    timeout: 300
});

document.body.onmousemove = myMouseWatcher;
```

### async.setCustomInterval

Function for interval with additional functionality.

Expect arguments:

- callback - function, which be called with interval;
- timeout - number of milliseconds;
- settings object:
    - times (number | false | undefined) - number of times, after which the interval will be clear;
    - initialInvoke (boolean) - run callback after interval initialized;

```typescript
setCustomInterval(() => {
    console.log("Initial");
}, 1000, {
    initialInvoke: true,
    times: 4
});
```

### date.convert

Function for fast date formatting;

Expect:

- timestamp;
- options:
    - time - show time;
    - locales - [Intl.LocalesArgument](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument)

```typescript
date.convert(new Date()) // return formatted date // 01/01/2024;
```

### date.isValid

Function for date validation.

Expect date

```typescript
date.isValid(new Date());
```

### date.getThisDate

Function which provides today date info object.

```typescript
date.getThisDate(); // return { day, month, year, numberInWeek }
```

### date.getDiff

Function which return time between two dates in millisecond.

```typescript
date.getDiff(new Date('2023-01-03 00:00:00'), new Date('2023-01-02 00:00:00')); // return 86400000 one day
```

### helpers.isEmpty

Function with typecast to not nullable. 
Equivalent [PHP empty](https://www.php.net/manual/en/function.empty.php). 

```typescript
helpers.isEmpty(''); // returns true
helpers.isEmpty([]); // returns true
helpers.isEmpty(undefined); // returns true
helpers.isEmpty(null); // returns true
helpers.isEmpty({}); // returns true

helpers.isEmpty(false); // returns false
helpers.isEmpty('true'); // returns false
helpers.isEmpty(123); // returns false
helpers.isEmpty([1]); // returns false
helpers.isEmpty({ example: 'test' }); // returns false
```

### helpers.toNumber

Typecast value to number or NaN.

```typescript
helpers.toNumber('123,123'); // returns 123.123;
helpers.toNumber(true); // returns 1;
helpers.toNumber('aaaa'); // returns NaN;
```

### helpers.toBoolean

Typecast value to boolean;

```typescript
helpers.toBoolean(1); // returns true;
helpers.toBoolean(0); // returns false;
helpers.toBoolean('true'); // returns true;
helpers.toBoolean('1'); // returns true;
helpers.toBoolean('asdsda'); // returns true;
helpers.toBoolean('false'); // returns false;
helpers.toBoolean('0'); // returns false;
helpers.toBoolean(''); // returns false;
```

### helpers.tryOrNull

Function that tries to do callback and return null if error trowed.

### helpers.tryOrNullAsync

Function that tries to do async callback and return null if error trowed.

### array.at

Polyfill of [Array.prototype.at](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at)

```typescript
import { array } from '@ankasru/utils-ts'

array.at([1,2,3], -1) // 3;
```

### system.getOs

Function returns user OS.

### system.(isMacOs|isWidows|isIos|isAndroid|isLinux)

Functions check user OS.

### system.writeToClipboard

If clipboard is supported, write to clipboard.

```typescript
await system.writeToClipboard('text');
```

### system.readFromClipboard

If clipboard is supported, read from clipboard.

```typescript
await system.readFromClipboard(); // text
```

### system.isClipboardSupported

Check is clipboard is supported;

```typescript
await system.isClipboardSupported(); // returns boolean;
```

### system.parseCookies

If cookies are supported, returns `CookiesObject`.

```typescript
const cookies = system.parseCookies();

cookies.getCookie('cookie name');

cookies.removeCookie('cookie name');

cookies.setCookie({
    name: 'cookie name',
    value: 'value',
    expAt: '2099-01-01 00:00:00', // optional
    path: '/' // optional, default '/'
});

cookies.parseCookies(); // update cookies object
```

### system.canUseDom

Function for checking window in ssr.

```typescript
canUseDom();
```

### text.generateHash

Function generate random string.

```typescript
text.generateHash(10); // returns a random string with length 10. Default is 6 characters.
```

### url.isLocal

Returns true if the URL contains `.local` or `test`.