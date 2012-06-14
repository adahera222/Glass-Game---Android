
function Update () {
	if(transform.position.y < -5)
		{
		transform.position.y = -3;
		renderer.enabled = false;
		rigidbody.isKinematic = true;
		}
}