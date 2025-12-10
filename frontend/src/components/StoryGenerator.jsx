import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import ThemeInput from "./ThemeInput.jsx";
import LoadingStatus from "./LoadingStatus.jsx";
import {API_BASE_URL} from "../util.js";


function StoryGenerator() {
    const navigate = useNavigate()
    const [theme, setTheme] = useState("")
    const [jobId, setJobId] = useState(null)
    const [jobStatus, setJobStatus] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let pollInterval;

        if (jobId && (jobStatus === "processing" || jobStatus === "pending")) {
            pollInterval = setInterval(() => {
                pollJobStatus(jobId)
            }, 2000) // Poll every 2 seconds instead of 5
        }

        return () => {
            if (pollInterval) {
                clearInterval(pollInterval)
            }
        }
    }, [jobId, jobStatus])

    const generateStory = async (theme) => {
        setLoading(true)
        setError(null)
        setTheme(theme)

        try {
            const response = await axios.post(`${API_BASE_URL}/stories/create`, {theme})
            const {job_id, status} = response.data
            setJobId(job_id)
            setJobStatus(status)

            pollJobStatus(job_id)
        } catch (e) {
            setLoading(false)
            setError(`Failed to generate story: ${e.message}`)
        }
    }

    const pollJobStatus = async (id) => {
        try {
            console.log(`Polling job status for ID: ${id}`)
            const response = await axios.get(`${API_BASE_URL}/jobs/${id}`)
            const {status, story_id, error: jobError} = response.data
            console.log(`Job status: ${status}, story_id: ${story_id}`)
            
            setJobStatus(status)

            if (status === "completed" && story_id) {
                console.log(`Story completed, navigating to story ${story_id}`)
                setLoading(false)
                navigate(`/story/${story_id}`)
            } else if (status === "failed" || jobError) {
                console.error(`Job failed: ${jobError}`)
                setError(jobError || "Failed to generate story")
                setLoading(false)
            }
            // Continue polling for "processing" or "pending" status
        } catch (e) {
            console.error('Error polling job status:', e)
            if (e.response?.status === 404) {
                setError("Job not found")
                setLoading(false)
            } else {
                setError(`Failed to check story status: ${e.message}`)
                setLoading(false)
            }
        }
    }


    const reset = () => {
        setJobId(null)
        setJobStatus(null)
        setError(null)
        setTheme("")
        setLoading(false)
    }

    return <div className="story-generator">
        {error && <div className="error-message">
            <p>{error}</p>
            <button onClick={reset}>Try Again</button>
        </div>}

        {!jobId && !error && !loading && <ThemeInput onSubmit={generateStory}/>}

        {loading && <LoadingStatus theme={theme} />}
    </div>
}

export default StoryGenerator