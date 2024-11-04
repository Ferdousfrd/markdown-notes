import { useState } from "react"
import ReactMde from "react-mde"
import Showdown from "showdown"

export default function Editor({ tempNoteText, setTempNoteText }) {
    const [selectedTab, setSelectedTab] = useState("write")
    const [showDownloadOptions, setShowDownloadOptions] = useState(false)

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })  

    function downloader(){
        setShowDownloadOptions(prev => !prev)
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
                    <button className="downloader" onClick={()=>console.log("txt")}>Download as .txt</button>
                    <button className="downloader" onClick={()=>console.log("pdf")}>Download as .pdf</button>
                </div>
            ):
            <button className="downloader" onClick={downloader}>Download</button>
            }
            

        </section>
    )
}
