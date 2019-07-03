const events = {
    windowFocusChange: (windowId, program) => new CustomEvent("indigOs.windowFocusChange", { detail: { windowId, program } }),
    windowDrag: (position) => new CustomEvent("indigOs.windowDrag", { detail: { position } })
};

export default events;