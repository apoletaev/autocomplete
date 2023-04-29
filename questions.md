1. PureComponent prevents class component from re-rendering if props and state are not changed.
You should keep your components pure without undesired side-effects (Ex, modifying external
variable in component before rendering).

2. Context is often used to avoid "props drilling" and deliver data for deep nested components.
But if your component (PureComponent) is "smart" enough it can miss an update from context.

3. Info could be sent from "child" component to it's "parent" via (1) handler function from "parent",
(2) sometimes it could be done via context or 3rd party libraries (Redux, Mobx, ...), (3) via browser's localstorage - why not?)

4. (1) React.memo (or React.PureComponent), (2) Some data-fetching libraries manage cached data and prevent
unnecessary re-renderings.

5. Usually fragments are used for creating a single virtual "parent" for nested components without extra markup.
Such thing could break, for example styles in some frameworks. Also, some problems could be faced with prop
"key" for fragments

6. (1) State management and data fetching, (2) Common logic sharing, (3) Creating errors boundaries

7. For promises developers usually use .catch() method. Async/await make code more readable and here try-catch
could be used. Callbacks should be constructed individually to handle them ccarefully.

8. setState takes 2 args: (1) updater/object and (2) callback which fires after state updates.
It's async for performance reasons (batching) and not blocking browser.

9. Typical conversion may look like: (1) create function, (2) reorganize props (destructuring etc),
   (3) state could be moved to hooks (Ex, useState), (4) different handlers also should be
converted to functions, (5) lifecycle methods should be converted into hooks (Ex, useEffect).

10. Components could use styles, for example, like predefined classes (tailwind ui), modules (imported from files), via
special libraries (styled components).

11. A string with markup could be used like <div dangerouslySetInnerHTML={{ __html: "<h1>Hello deel!</h1>" }} />.
Or respective parsers could be used, for instance, .text() in fetch.
