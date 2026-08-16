import "@testing-library/jest-dom";

Object.defineProperty(HTMLElement.prototype, "scrollTo", {
    value: () => {},
    writable: true,
});
