import dom, { Fragment } from 'jsx-render';

// import CodeMirror from 'codemirror';
// import 'codemirror/lib/codemirror.js';
/**
 * @function CodeViewer
 * @param {Object} props 
 * Used to display the code of the users page. Editing is not available due to vulnerabilities blah blah 
 * 
 * 
 * WARNING:: The above implementation, importing the js file, is not the correct solution.
 * Doing this increases your bundle size by almost 200KiB.
 * The script tags should be what prevents this but that has so far not been a working solution either.
 * This has been disabled for now.
 * 
 * 
 */
const CodeViewer = props => {
    let codeViewer;
    let codeViewerTextArea;

    const jsx =
        <Fragment>
            <textarea ref={elm => codeViewerTextArea = elm}></textarea>
        </Fragment>

    // let editorContent = CodeMirror.Doc("<div></div>", "htmlmixed");
    const codemirror = CodeMirror.fromTextArea(codeViewerTextArea, {
        // value: editorContent,
        value: "var code = 'code';",
        mode: "javascript",
        lineNumbers: true,
        // readOnly: true,
        // theme: "darcula"
    });

    
    codemirror.refresh();
    codemirror.focus();
    // console.log("codemirror", codemirror)
    // console.log("modes", CodeMirror.modes)
    // console.log("mime modes", CodeMirror.mimeModes)

    codemirror.on('focus', props.focus);
    codemirror.on('blur', () => props.blur({ relatedTarget: codeViewerTextArea }, 'codeviewer'))

    return jsx;
}

export default CodeViewer;