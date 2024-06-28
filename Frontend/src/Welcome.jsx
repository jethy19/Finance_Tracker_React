import React from 'react'
import './Welcome.css'
import f1 from './finance1.jpg'
import f2 from './finance2.jpg'
import f3 from './finance3.jpg'

const img = [
	f3,f2,f1
]
const delay = 3000

function Welcome(props) {
	const [index, setIndex] = React.useState(0)
	const timeoutRef = React.useRef(null)

	function resetTimeout() {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}
	}

	React.useEffect(() => {
		resetTimeout()
		timeoutRef.current = setTimeout(
			() =>
				setIndex((prevIndex) =>
					prevIndex === img.length - 1 ? 0 : prevIndex + 1
				),
			delay
		)

		return () => {
			resetTimeout()
		}
	}, [index])

	return (
		<div style={{marginLeft:"10px"}}>
			<div><h2>Welcome {props.data}</h2></div>
			<div className="slideshow-container">
				<div
					className="mySlides"
					style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
				>
					{img.map((backgroundimg,index) => (
						<img
							className="slide"
							key={index}
							src={backgroundimg}
							width="100%"
							alt={index}
							height="400"
							object-fit="cover"
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default Welcome