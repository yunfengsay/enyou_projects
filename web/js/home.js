Laro.register('JxHome', function (La) {
	var pkg = this;
	var bugBalls;
	this.initStage = function () {
		var canvas = document.getElementById('canvas');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		this.canvas = canvas;
		this.stage = new CVS.$stage(canvas);
		this.ctx = this.stage.ctx;
		this.vpx = canvas.width / 2;
		this.vpy = canvas.height / 2;
		this.normalN = 10;
		this.normalBalls = [];
		this.angleX = 0.001;
		this.angleY = 0.001;

		this.zstep = 1;
		this.zflag = 1;
	}

	this.range = function (a, b) {
		return Math.floor(Math.random() * (b - a) + a);
	}

	this.tween = function (ball, t) {
		if (!ball.end) {
			var _x = ball.xpos, _y = ball.ypos, _z = ball.zpos;
			var _t = (+new Date) - ball.startAnimTime;
			ball.xpos = ball.f_xpos + (ball.t_xpos - ball.f_xpos) * Math.sin(Math.PI * _t / (2 * t));
			ball.ypos = ball.f_ypos + (ball.t_ypos - ball.f_ypos) * Math.sin(Math.PI * _t / (2 * t));
			ball.zpos = ball.f_zpos + (ball.t_zpos - ball.f_zpos) * Math.sin(Math.PI * _t / (2 * t));

			if (_t >= t) {
				ball.end = true;
			}
		}
	}

	this.addNormalBalls = function (n) {
		var vpx = this.vpx, vpy = this.vpy, range = this.range, stage = this.stage,
			_this = this;
		if (n) {
			this.normalN = n;
		}
		for (var i = 0; i < this.normalN; i++) {

			var ball = CVS.createPoint3D(this.stage.ctx, function () {
				var color = 'rgb(' + range(200, 255) + ', ' + range(40, 255) + ', ' + range(80, 180) + ')';

				this.xpos = range(-vpx, vpx);
				this.ypos = range(-vpy, vpy);
				this.zpos = range(-vpx, vpx);

				this.width = range(8, 15);
				this.w = this.width;
				this.draw = function () {
					this.ctx.beginPath();
					this.ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2, true);
					this.ctx.closePath();
					this.ctx.fillStyle = color;
					this.ctx.fill();
				}
			});
			ball.type = 'normal';
			ball.setVanishPoint(vpx, vpy);
			ball.setCenterPoint(0, 0, 0);
			stage.addChild(ball);
			this.normalBalls.push(ball);
		}
	}

	this.updateBalls = function (dt, name) {
		var balls = this.particleHash[name];
		this._updateBalls(dt, balls);
	};

	this._updateBalls = function (dt, balls) {
		for (var i = 0; i < balls.length; i++) {
			var ball = balls[i];

			ball.zpos += JxHome.zstep;

			ball.rotateX(this.angleX);
			ball.rotateY(this.angleY);
			var scale = ball.getScale(),
				pos = ball.getScreenXY();
			ball.width = Math.max(10 * scale, 2);
			ball.x = pos.x;
			ball.y = pos.y;
		}
	};

	this.pushBalls = function (name) {
		var balls = this.particleHash[name];
		for (var i = 0; i < balls.length; i++) {
			var ball = balls[i];
			JxHome.stage.addChild(ball);
			ball.end = false;
			ball.width = ball.logoPos.width;
			ball.color = 'rgb(' + ball.logoPos.r + ', ' + ball.logoPos.g + ', ' + ball.logoPos.b + ')';
			ball.startAnimTime = (+ new Date);

		}
	}

	this.bindStage = function () {
		var _this = this;
		this.stage.addEventListener('mousemove', function (x, y) {
			if (+_this.angleX) {

			}
			_this.angleY = (x - _this.vpx) * .00001;
			_this.angleX = (y - _this.vpy) * .00001;
			// console.log(x, _this.vpx, _this.angleX)
		});
	}

	this.initParticles = function () {
		this.slogan_1_P = this.getParticles('slogan1', 96, 11);
		this.slogan_2_P = this.getParticles('slogan2', 96, 11);
		this.logoimg = this.getParticles('logoimg', 128, 68);


		this.particleHash =
			{
				'normal': this.normalBalls,
				'slogan1': this.slogan_1_P,
				'slogan2': this.slogan_2_P,
				'logoimg': this.logoimg,
			}
	}

	this.getParticles = function (id, w, h, z) {
		if (z == undefined) { z = 0; }
		//
		var image = document.getElementById(id);
		//
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.ctx.drawImage(image, 0, 0, w, h, Math.round(this.canvas.width / 2 - w / 2), Math.round(this.canvas.height / 2 - h / 2), w, h);

		var imageData = this.ctx.getImageData(Math.round(this.canvas.width / 2 - w / 2), Math.round(this.canvas.height / 2 - h / 2), w, h);
		//
		////////////////////////
		var ret = [];
		for (var x = 0; x < imageData.width; x++) {
			for (var y = 0; y < imageData.height; y++) {
				var i = 4 * (y * imageData.width + x);
				if (imageData.data[i + 3] > 128) {
					//------------------------
					var r = imageData.data[i],
						g = imageData.data[i + 1],
						b = imageData.data[i + 2];
					ret.push(new JxHome.Particle(this.stage, this.canvas, id, w, h, x, y, z, r, g, b));
				}
			}
		}
		return ret;
	}

	this.init = function () {
		this.initStage();
		this.bindStage();
		this.initParticles();

		JxHome.$fsm.init();
		JxHome.$loop.init();
	}
});

Laro.register('JxHome', function (La) {
	var pkg = this,
		range = JxHome.range,
		vpx = JxHome.vpx,
		vpy = JxHome.vpy;

	this.Particle = function (stage, canvas, id, w, h, x, y, z, r, g, b) {
		this.canvas = canvas;

		var vpx = canvas.width / 2,
			vpy = canvas.height / 2;

		var ball = CVS.createPoint3D(stage.ctx, function () {
			var color = 'rgb(' + range(200, 255) + ', ' + range(200, 255) + ', ' + range(200, 255) + ')';
			var a = Math.PI * 2 * Math.random();
			var b = Math.PI * 2 * Math.random();
			var r = range(vpx, vpy);

			this.xpos = Math.sin(a) * Math.sin(b) * r;
			this.ypos = Math.cos(a) * Math.sin(b) * r;
			this.zpos = -Math.abs(Math.cos(b) * r);

			this.width = range(3, 15);
			this.color = color;
			this.draw = function () {
				this.ctx.beginPath();
				this.ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2, true);
				this.ctx.closePath();
				this.ctx.fillStyle = this.color;
				this.ctx.fill();
			}
		});

		ball.logoPos =
			{//影响粒子密度
				x: (x - w / 2) * 11,
				y: (y - h / 2) * 11,
				// z: Math.round((1100-this.canvas.width)/5),
				z: Math.round((2500 - this.canvas.width) / 5),
				width: 10,
				r: r,
				g: g,
				b: b
			};

		ball.f_xpos = ball.xpos;
		ball.f_ypos = ball.ypos;
		ball.f_zpos = ball.zpos;
		ball.t_xpos = ball.logoPos.x;
		ball.t_ypos = ball.logoPos.y;
		ball.t_zpos = ball.logoPos.z;

		ball.startAnimTime = (+new Date);
		ball.end = true;
		ball.type = id;

		ball.setVanishPoint(canvas.width / 2, canvas.height / 2);
		ball.setCenterPoint(0, 0, z);

		ball.moveX = 1 - Math.random() * 2;
		return ball;
	}
});

Laro.register('JxHome.$states', function (La) {
	var pkg = this;

	this.No = La.BaseState.extend(function () { })
		.methods({
			enter: function (msg, fromState) {
				this._t = 0;
				JxHome.addNormalBalls();
			},
			leave: function () {

			},
			update: function (dt) {
				this._t += dt*100;
				JxHome.updateBalls(dt, 'normal');
			},
			transition: function () {
				if (this._t > 2) {
					this.host.setState(1);
				}
			},
			draw: function () {

			}
		});

	this.Slogan1 = La.BaseState.extend(function () { })
		.methods({
			enter: function (msg, fromState) {
				this.push = false;
				this._t = 0;
				this.explosion = false;
				console.log(" 进入 口号一")
			},
			leave: function () {
				for (var i = 0; i < JxHome.stage.children.length; i++) {
					var ball = JxHome.stage.children[i];
					//ball.type == 'logoimg' 在循环时清除最后一组粒子，非常重要!!!!
					if (ball.type == 'normal' || ball.type == 'logoimg') {
						JxHome.stage.children.splice(i, 1);
						i--;
					}
				}
				console.log(" 离开 口号一")
			},
			update: function (dt) {
				this._t += dt;
				JxHome.updateBalls(dt, 'normal');
				if (JxHome.bugBalls) JxHome._updateBalls(dt, JxHome.bugBalls);
				//最后一组动画停滞BUG

				//////////
				////////
				////
				if (this._t > 2 && !this.push) {
					JxHome.pushBalls('slogan1');
					
					this.push = true;
				}
				//
				if (this.push) {
					for (var i = 0; i < JxHome.slogan_1_P.length; i++) {
						var ball = (JxHome.slogan_1_P[i]);

						JxHome.tween(ball, 1000);
						// ball.zpos += JxHome.zstep;

						// ball.rotateX(JxHome.angleX);
						// ball.rotateY(JxHome.angleY);
						var scale = ball.getScale(),
							pos = ball.getScreenXY();

						ball.width = Math.max(10 * scale, 2);
						ball.x = pos.x;
						ball.y = pos.y;
					}
				}
			},
			transition: function () {
				var range = JxHome.range,
					vpx = JxHome.vpx,
					vpy = JxHome.vpy;
				if (this._t > 5 && !this.explosion) 
				{
					for (var i = 0; i < JxHome.slogan_1_P.length; i ++) 
					{
						var ball = JxHome.slogan_1_P[i];
						ball.f_xpos = ball.xpos;
						ball.f_ypos = ball.ypos;
						ball.f_zpos = ball.zpos;
						ball.t_xpos = range(-vpx, vpx);
						ball.t_ypos = range(-vpy, vpy);
						ball.t_zpos = range(-vpx, vpx);

						ball.end = false;
						ball.width = range(8, 15);
						ball.startAnimTime = (+ new Date);
					}
					this.explosion = true;
					this.explosionT = (+new Date);
				}

				if (this.explosion && (+new Date) - this.explosionT >= 1000) {
					this.host.setState(2);
				}
			},
			draw: function () {

			}
		});

	this.Slogan2 = La.BaseState.extend(function () { })
		.methods({
			enter: function (msg, fromState) {
				this.push = false;
				this._t = 0;
				this.explosion = false;
				console.log("进入口号 二 ")
			},
			leave: function () {
				console.log("离开口号 二 ")
				
				for (var i = 0; i < JxHome.stage.children.length; i++) {
					var ball = JxHome.stage.children[i];
					if (ball.type == 'slogan2') {
						JxHome.stage.children.splice(i, 1);
						i--;
					}
				}
				setTimeout(function() {
			$("#home-text-container").show()
			
				}, 2000);
			
			},
			update: function (dt) {
				this._t += dt;
				JxHome.updateBalls(dt, 'slogan1');

				if (this._t > 2 && !this.push) {
					JxHome.pushBalls('slogan2');
					this.push = true;
				}
				if (this.push) {
					for (var i = 0; i < JxHome.slogan_2_P.length; i++) {
						var ball = (JxHome.slogan_2_P[i]);

						JxHome.tween(ball, 1000);
						// ball.zpos += JxHome.zstep;

						// ball.rotateX(JxHome.angleX);
						// ball.rotateY(JxHome.angleY);
						var scale = ball.getScale(),
							pos = ball.getScreenXY();

						ball.width = Math.max(10 * scale, 2);
						ball.x = pos.x;
						ball.y = pos.y;
					}
				}
			},
			transition: function () {
				var range = JxHome.range,
					vpx = JxHome.vpx,
					vpy = JxHome.vpy;
				if (this._t > 5 && !this.explosion) {
					for (var i = 0; i < JxHome.slogan_2_P.length; i++) {
						var ball = JxHome.slogan_2_P[i];

						ball.f_xpos = ball.xpos;
						ball.f_ypos = ball.ypos;
						ball.f_zpos = ball.zpos;
						ball.t_xpos = range(-vpx, vpx);
						ball.t_ypos = range(-vpy, vpy);
						ball.t_zpos = range(-vpx, vpx);

						ball.end = false;
						ball.width = range(8, 15);
						ball.startAnimTime = (+ new Date);
					}
					this.explosion = true;
					this.explosionT = (+new Date);
				}
				if (this.explosion && (+new Date) - this.explosionT >= 1000) {
					this.host.setState(3);
				}
			},
			draw: function () {

			}
		});

	this.LogoImg = La.BaseState.extend(function () {

	}).methods({
		enter: function (msg, fromState) {
			console.log("进入 logo img")
			this.push = false;
			this._t = 0;
			this.explosion = false;
		},
		leave: function () {
			console.log("离开 logo img")
			for (var i = 0; i < JxHome.stage.children.length; i++) {
				var ball = JxHome.stage.children[i];
				if (ball.type == 'slogan2') {
					JxHome.stage.children.splice(i, 1);
					i--;
				}
			}
			
		},
		update: function (dt) {
			this._t += dt;
			JxHome.updateBalls(dt, 'slogan1');

			if (this._t > 2 && !this.push) {
				JxHome.pushBalls('logoimg');
				this.push = true;
			}
			if (this.push) {
				for (var i = 0; i < JxHome.logoimg.length; i ++) 
				{
					var ball = (JxHome.logoimg[i]);
					JxHome.tween(ball, 1000);
					// ball.zpos += JxHome.zstep;
					// console.log(ball.zpos, JxHome.zstep)
					if(ball.zpos < 1605){
						ball.zpos ++						
					}
					// ball.rotateX(JxHome.angleX);
					// ball.rotateY(JxHome.angleY);
					var scale = ball.getScale(),
					pos = ball.getScreenXY();
					
					ball.width = Math.max(10*scale, 2);
					ball.x = pos.x;
					ball.y = pos.y;
				}
			}
			
			//this.checkExplosion();
		},
		transition: function () {
			var range = JxHome.range,
				vpx = JxHome.vpx,
				vpy = JxHome.vpy;
			if (this._t > 5 && !this.explosion) {
				for (var i = 0; i < JxHome.slogan_2_P.length; i++) {
					var ball = JxHome.slogan_2_P[i];

					ball.f_xpos = ball.xpos;
					ball.f_ypos = ball.ypos;
					ball.f_zpos = ball.zpos;
					ball.t_xpos = range(-vpx, vpx);
					ball.t_ypos = range(-vpy, vpy);
					ball.t_zpos = range(-vpx, vpx);

					ball.end = false;
					ball.width = range(8, 15);
					ball.startAnimTime = (+ new Date);
				}
				this.explosion = true;
				this.explosionT = (+new Date);
			}
			if (this.explosion && (+new Date) - this.explosionT >= 1000) {
				// this.host.setState(3);
				return false
			}
		},
		draw: function () {

		}
	});


});

Laro.register('JxHome.$fsm', function (La) {
	var pkg = this;

	this.init = function () {
		this.getStatesList();
		this.$ = new La.AppFSM(this, this.statesList);
		this.$.setState(0);
	}
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	this.getStatesList = function () {
		this.statesList = [
			0, JxHome.$states.No,
			1, JxHome.$states.Slogan1,
			2, JxHome.$states.Slogan2,
			3, JxHome.$states.LogoImg,
		];
	}

	this.setState = function (state, msg, suspendCurrent) {
		this.$.setState(state, msg, suspendCurrent);

	}
});

Laro.register('JxHome.$loop', function (La) {
	var pkg = this;

	this.init = function () {
		this.$ = new La.Loop(this.looper, this);
	}

	this.looper = function (dt) {
		this.update(dt);
		this.draw();
	}
	this.update = function (dt) {
		JxHome.$fsm.$.update(dt);
		if (JxHome.zstep > 2 || JxHome.zstep < -2) {
			JxHome.zflag *= -1;
		}
		JxHome.zstep += JxHome.zflag * 0.01;

	}
	this.draw = function () {
		JxHome.ctx.clearRect(0, 0, JxHome.canvas.width, JxHome.canvas.height);
		JxHome.stage.render();
		JxHome.$fsm.$.draw();
	}
});
///////////////////////////////////////////////////////////////////////////////
window.onload = function () {
	JxHome.init();
}
// $(window).resize(function() {
// window.location.href = "index.html";
// });