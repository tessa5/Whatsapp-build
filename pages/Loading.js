import styled from "styled-components"
function Loading() {
    return (
        <center>
            <div>
                <Image 
                    src="http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c543.png"
                    alt="loading"
                    />
                    
            </div>
        </center>
    )
}

export default Loading

const Image = styled.img`
    height:200px;
    margin-bottom:10px;
` 