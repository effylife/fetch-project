import Login from "@/components/Login"
import heroImage from '@/public/doggy-door-1.jpg'
import Image from 'next/image'

export default function Page() {

	return (
		<div className="section">
			<div className="container">
				<div className="hero">
					<Image 
						className="hero-image"
						src={heroImage}
						alt="A golden retriever puppy coming in through a doggy door."
						/>
					<Login />
				</div>
			</div>
		</div>
	)
}