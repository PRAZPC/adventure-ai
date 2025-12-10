import {useState}  from "react"
function ThemeInput({onSubmit}){

const [theme, setTheme] = useState("");
const [error,setError] = useState("")

const handleSubmit = (e) =>{
    e.preventDefault();
    if(!theme.trim()){
        setError("please enter the name");
        return
    }
    onSubmit(theme)
    }
    return <div className="theme-input-container">
        <h2>generate ai</h2>
        <p>enter your theme name</p>
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <input type="text" value={theme} onChange={(e)=> setTheme(e.target.value) } placeholder="enter any thing water , rainbow , cow ,cars" className={error ? 'error' :''}/>
                {error && <p className="error-text">{error}</p>}
            </div>
            <button type="submit" className='generate-btn'> generate</button>

        </form>
    </div>
}
export default ThemeInput;