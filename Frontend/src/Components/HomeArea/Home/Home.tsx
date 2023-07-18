import imageSource from "../../../Assets/images/room.jpg";

function Home(): JSX.Element {
    return (
        <div className="Home">
			<img src={imageSource} alt="" />
        </div>
    );
}

export default Home;
