var target: Transform;
var targetMove: Vector3;
var distance = 10.0;

var xSpeed = 20.0;
var ySpeed = 20.0;

var yMinLimit = -20;
var yMaxLimit = 80;

var distanceMin = 3;
var distanceMax = 15;

private
var x = 0.0;
private
var y = 0.0;

private
var mainGamejs: gameJS;

@
script AddComponentMenu("Camera-Control/Mouse Orbit")

function Start() {
    mainGamejs = GameObject.Find("mainGame").GetComponent(gameJS);
    var angles = transform.eulerAngles;
    x = angles.y;
    y = angles.x;

    // Make the rigid body not change rotation
    if (GetComponent. < Rigidbody > ())
        GetComponent. < Rigidbody > ().freezeRotation = true;
}

function LateUpdate() {

    if (mainGamejs.touchScreen &&
        mainGamejs.hitUIObjectName != "cammeraPlate" &&
        mainGamejs.hitUIObjectName != "removePlate" &&
        mainGamejs.hitUIObjectName != "movePlate" &&
        mainGamejs.hitUIObjectName != "cubePlate") {

        x += Input.GetAxis("Mouse X") * xSpeed;
        y -= Input.GetAxis("Mouse Y") * ySpeed;

        y = ClampAngle(y, yMinLimit, yMaxLimit);

        var rotation = Quaternion.Euler(y, x, 0);

        distance = Mathf.Clamp(distance - Input.GetAxis("Mouse ScrollWheel") * 5, distanceMin, distanceMax);

        var hit: RaycastHit;
        //        if (Physics.Linecast(target.position, transform.position + targetMove, hit)) {
        //            distance -= hit.distance;
        //        }

        var position = rotation * Vector3(0.0, 0.0, -distance) + target.position + targetMove;

        transform.rotation = rotation;
        transform.position = position;

        //更新攝影機與目標的相對位置
        mainGamejs.cameraRelativeTarget = mainGamejs.mainCamera.transform.position - mainGamejs.Player.transform.position;

    }

}


static

function ClampAngle(angle: float, min: float, max: float) {
    if (angle < -360)
        angle += 360;
    if (angle > 360)
        angle -= 360;
    return Mathf.Clamp(angle, min, max);
}
