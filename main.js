harry_potterRemix = "";
believer = "";
faded = "";
shape_of_you = "";
thunder = "";
let_it_go_frozen = "";


function preload()
{
	harry_potterRemix = loadSound("music.mp3");
	console.log('loaded Harry Potter Remix!');

	believer = loadSound("believer.mp3");
	console.log('loaded Believer!');

	faded = loadSound("faded.mp3");
	console.log('loaded Faded!');

	shape_of_you = loadSound("shape_of_you.mp3");
	console.log('loaded Shape Of You!');

	thunder = loadSound("thunder.mp3");
	console.log('loaded Thunder!');

	let_it_go_frozen = loadSound("let-it-go.mp3");
	console.log('loaded Let it Go!');

}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}

function draw() {
	image(video, 0, 0, 600, 500);

	fill("#FF0000");
	stroke("#FF0000");

	if(scoreRightWrist > 0.2)
	{ 
		circle(rightWristX,rightWristY,20);

		if(rightWristY >0 && rightWristY <= 100)
		{
			document.getElementById("speed").innerHTML = "Speed = 0.5x";		
			harry_potterRemix.rate(0.5);
		}
		else if(rightWristY >100 && rightWristY <= 200)
		{
			document.getElementById("speed").innerHTML = "Speed = 1x";		
			harry_potterRemix.rate(1);
		}
		else if(rightWristY >200 && rightWristY <= 300)
		{
			document.getElementById("speed").innerHTML = "Speed = 1.5x";		
			harry_potterRemix.rate(1.5);
		}
		else if(rightWristY >300 && rightWristY <= 400)
		{
			document.getElementById("speed").innerHTML = "Speed = 2x";		
			harry_potterRemix.rate(2);
		}
		else if(rightWristY >400)
		{
			document.getElementById("speed").innerHTML = "Speed = 2.5x";		
			harry_potterRemix.rate(2.5);
		}
	}

	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);
		InNumberLeftWristY = Number(leftWristY);
		new_leftWristY = floor(InNumberLeftWristY *2);
		leftWristY_divide_1000 = new_leftWristY/1000;
		document.getElementById("volume").innerHTML = "Volume = " + leftWristY_divide_1000;		
		harry_potterRemix.setVolume(leftWristY_divide_1000);	
	}

}

function play()
{
	var name = document.getElementById("name").value;
	
	if(name == "harry_potter") {
		let_it_go_frozen.stop();
		faded.stop();
		believer.stop();
		shape_of_you.stop();
		thunder.stop();

		harry_potterRemix.play();
		harry_potterRemix.rate(1);
		harry_potterRemix.setVolume(1);
	}
	
	if(name == "frozen") {
		faded.stop();
		believer.stop();
		shape_of_you.stop();
		thunder.stop();
		harry_potterRemix.stop();

		let_it_go_frozen.play();
	}

	if(name == "faded") {
		let_it_go_frozen.stop();
		believer.stop();
		shape_of_you.stop();
		harry_potterRemix.stop();
		thunder.stop();

		faded.play();
	}

	if(name == "believer") {
		let_it_go_frozen.stop();
		harry_potterRemix.stop();
		faded.stop();
		shape_of_you.stop();
		thunder.stop();

		believer.play();
	}

	if(name == "shape_of_you") {
		let_it_go_frozen.stop();
		harry_potterRemix.stop();
		faded.stop();
		thunder.stop();
		believer.stop();

		shape_of_you.play();
	}

	if(name == "thunder") {
		let_it_go_frozen.stop();
		harry_potterRemix.stop();
		faded.stop();
		believer.stop();
		shape_of_you.stop();

		thunder.play();
	}
}

function stop() {
	harry_potterRemix.stop();
	believer.stop();
	faded.stop();
	shape_of_you.stop();
	let_it_go_frozen.stop();
	thunder.stop();
}

function pause() {
	harry_potterRemix.pause();
	believer.pause();
	faded.pause();
	shape_of_you.pause();
	let_it_go_frozen.pause();
	thunder.pause();
}