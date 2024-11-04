import { useState } from "react"
import ReactMde from "react-mde"
import Showdown from "showdown"
import { jsPDF } from "jspdf"

export default function Editor({ tempNoteText, setTempNoteText }) {
    const [selectedTab, setSelectedTab] = useState("write")
    const [showDownloadOptions, setShowDownloadOptions] = useState(false)

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })  

    function downloader(){                      // this function to toggle the state of button shows
        setShowDownloadOptions(prev => !prev)
    }
    

    // Function to download our tempNoteText body as .txt for note download
    function downloadAsTxt() {
        // Step 0: Get the markdown version directly from tempNoteText
        const markdownContent = tempNoteText; // Use tempNoteText as is for markdown

        // Step 1: Create a Blob with markdownContent as content and set the MIME type to "text/plain"
        const blob = new Blob([markdownContent], { type: "text/plain" });

        // Step 2: Create a URL for the Blob object
        const url = URL.createObjectURL(blob);

        // Step 3: Create an anchor element and set the href to the Blob URL
        const a = document.createElement("a");
        a.href = url;

        // Set the download file name to the first line of the note, replacing any non-alphanumeric characters with underscores 
        // and limiting the length to 15 characters for readability and safety
        a.download = `${markdownContent.split("\n")[0].replace(/[^a-z0-9]/gi, '_').substring(0, 15)}.txt`;

        // Step 4: Programmatically click the anchor to trigger the download
        a.click();

        // Step 5: Revoke the Blob URL to free up memory
        URL.revokeObjectURL(url);

        setShowDownloadOptions(prev=>!prev)
}

    // Function to download as PDF
    function downloadAsPDF() {
        const doc = new jsPDF();
        const htmlContent = converter.makeHtml(tempNoteText); // Convert Markdown to HTML
        
        // Use 'html' method to add HTML content to PDF
        doc.html(htmlContent, {
            callback: function (doc) {
                doc.save(`${tempNoteText.split("\n")[0].replace(/[^a-z0-9]/gi, '_').substring(0, 15)}.pdf`);
            },
            x: 10,
            y: 10,
            width: 190, // Adjust the width to fit the page
            windowWidth: 800 // Use this to set the width of the HTML element being rendered
        });
        setShowDownloadOptions(prev=>!prev)
    }

    return (
        <section className="pane editor">
            <ReactMde
                value={tempNoteText}
                onChange={setTempNoteText}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80}
                heightUnits="vh"
            />
            
            {showDownloadOptions ? (
                <div>
                    <button className="downloader" onClick={downloadAsTxt}>Download as .txt</button>
                    <button className="downloader" onClick={downloadAsPDF}>Download as .pdf</button>
                    <br/>
                    <small className="hint-message">(.txt ) for raw plain text note and (.pdf) for markdown note version</small>
                </div>
            ):
            <button className="downloader" onClick={downloader}>Download</button>
            }
            

        </section>
    )
}
