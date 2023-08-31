import React from "react";
import Ipod from "./Ipod";
import ZingTouch from "zingtouch";
import Helmet from "react-helmet";

import images from "../src/assets/images/images";
import songs from "../src/assets/songs/songs";

class App extends React.Component {
	constructor() {
		super();
		// State
		const song1 = new Audio(songs.music1);
		const song2 = new Audio(songs.music2);
		const song3 = new Audio(songs.music3);
		this.state = {
			menu: {
				options: [
					{
						music: ["all-songs", "artists", "albums"],
					},
					{
						games: [],
					},
					{
						coverflow: [],
					},
					{
						settings: [
							"change-wallpaper",
							"change-orientation",
							"change-theme",
						],
					},
				],

				menuVisible: "no",
				musicVisible: "no",
				settingsVisible: "no",
				optionsIndex: 0,
				musicIndex: 0,
				settingsIndex: 0,
				pageRender: "no",
			},

			screen: {
				wallpaper: [
					images.wallpaper1,
					images.wallpaper2,
					images.wallpaper3,
					images.wallpaper4,
					images.wallpaper5,
					images.coverflow,
					images.games,
					images.allsongs,
					images.artists,
					images.albums,
				],

				wallpaperIndex: 0,
				screenIndex: 0,
			},

			mouse: {
				innerCircle: "",
			},

			songsList: {
				songs: [song1, song2, song3,],
				thumbnails: [
					images.song1Img,
					images.song2Img,
					images.song3Img,
					images.song4Img,
					images.song5Img,
				],
				songIndex: 0,
				name: ["Calm Down", "Unholy", "Unstoppable", "Tsunami", "Senorita"],
				isPlaying: false,
			},

			theme: {
				themeList: ["Classic", "Dark"],
				themeIndex: 0,
			},
		};

		this.controllerRef = React.createRef();
		this.progressRef = React.createRef();
	}

	isMenuVisible = (menu, screen) => {
		const { songsList } = this.state;

		if (menu.pageRender === "yes") {
			menu.menuVisible = "yes";
			screen.screenIndex = screen.wallpaperIndex;
			menu.pageRender = "no";

			songsList.songs.map((song) => {
				song.pause();
				song.currentTime = 0;
				return [];
			});
			songsList.isPlaying = false;
		} else {
			if (
				menu.menuVisible === "yes" &&
				menu.musicVisible === "no" &&
				menu.settingsVisible === "no"
			) {
				menu.menuVisible = "no";
			} else if (
				menu.menuVisible === "yes" &&
				menu.musicVisible === "yes" &&
				menu.settingsVisible === "no"
			) {
				menu.musicVisible = "no";
			} else if (
				menu.menuVisible === "yes" &&
				menu.musicVisible === "no" &&
				menu.settingsVisible === "yes"
			) {
				menu.settingsVisible = "no";
			} else {
				menu.menuVisible = "yes";
			}
		}
		this.setState({ menu, screen, songsList });
		return;
	};

	addClass = (classname, event) => {
		if (classname === "inner-circle" && event === "down") {
			const { mouse } = this.state;
			mouse.innerCircle = "down";
			this.setState({ mouse });
		}
	};

	removeClass = (classname, event) => {
		if (classname === "inner-circle" && event === "down") {
			const { mouse } = this.state;
			mouse.innerCircle = "";
			this.setState({ mouse });
		}
	};

	tap = (menu, screen) => {
		const { songsList, theme } = this.state;

		if (
			menu.menuVisible === "yes" &&
			menu.musicVisible === "no" &&
			menu.settingsVisible === "no"
		) {
			if (menu.optionsIndex === 0) {
				menu.musicVisible = "yes";
			} else if (menu.optionsIndex === 1) {
				menu.pageRender = "yes";
				menu.menuVisible = "no";
				screen.screenIndex = 6;
			} else if (menu.optionsIndex === 2) {
				menu.pageRender = "yes";
				menu.menuVisible = "no";
				screen.screenIndex = 5;
			} else {
				menu.settingsVisible = "yes";
			}
		} else if (
			menu.menuVisible === "yes" &&
			menu.musicVisible === "yes" &&
			menu.settingsVisible === "no"
		) {
			if (menu.musicIndex === 0) {
				menu.pageRender = "yes";
				menu.menuVisible = "no";
				screen.screenIndex = 7;
				songsList.isPlaying = true;
				songsList.songs[songsList.songIndex].play();
			} else if (menu.musicIndex === 1) {
				menu.pageRender = "yes";
				menu.menuVisible = "no";
				screen.screenIndex = 8;
			} else {
				menu.pageRender = "yes";
				menu.menuVisible = "no";
				screen.screenIndex = 9;
			}
		} else if (
			menu.menuVisible === "yes" &&
			menu.musicVisible === "no" &&
			menu.settingsVisible === "yes"
		) {
			if (menu.settingsIndex === 0) {
				if (screen.wallpaperIndex < 4) {
					screen.wallpaperIndex += 1;
				} else {
					screen.wallpaperIndex = 0;
				}
				screen.screenIndex = screen.wallpaperIndex;
			} else if (menu.settingsIndex === 1) {
				alert("Feature Will Be Added in the Next Version Release !! :)");
			} else {
				if (theme.themeIndex === 0) {
					theme.themeIndex = 1;
				} else {
					theme.themeIndex = 0;
				}
			}
		} else {
		}
		this.setState({ menu, screen, songsList, theme });
		return;
	};

	rotate = (menu) => {
		this.activeRegionOuter.bind(
			this.containerElementOuter,
			"rotate",
			(event) => {
				event.stopPropagation();

				if (
					menu.menuVisible === "yes" &&
					menu.musicVisible === "no" &&
					menu.settingsVisible === "no"
				) {
					const angle = event.detail.angle;
					if (angle >= 0 && angle <= 90) {
						menu.optionsIndex = 0;
					} else if (angle > 90 && angle <= 180) {
						menu.optionsIndex = 1;
					} else if (angle > 180 && angle <= 270) {
						menu.optionsIndex = 2;
					} else if (angle > 270 && angle <= 360) {
						menu.optionsIndex = 3;
					} else if (angle >= -90 && angle < 0) {
						menu.optionsIndex = 3;
					} else if (angle >= -180 && angle < -90) {
						menu.optionsIndex = 2;
					} else if (angle >= -270 && angle < -180) {
						menu.optionsIndex = 1;
					} else if (angle >= -360 && angle < -270) {
						menu.optionsIndex = 0;
					} else {
					}
				} else if (
					menu.menuVisible === "yes" &&
					menu.musicVisible === "yes" &&
					menu.settingsVisible === "no"
				) {
					const angle = event.detail.angle;
					if (angle >= 0 && angle <= 120) {
						menu.musicIndex = 0;
					} else if (angle > 120 && angle <= 240) {
						menu.musicIndex = 1;
					} else if (angle > 240 && angle <= 360) {
						menu.musicIndex = 2;
					} else if (angle >= -120 && angle < 0) {
						menu.musicIndex = 2;
					} else if (angle >= -240 && angle < -120) {
						menu.musicIndex = 1;
					} else if (angle >= -360 && angle < -240) {
						menu.musicIndex = 0;
					} else {
					}
				} else if (
					menu.menuVisible === "yes" &&
					menu.musicVisible === "no" &&
					menu.settingsVisible === "yes"
				) {
					const angle = event.detail.angle;
					if (angle >= 0 && angle <= 120) {
						menu.settingsIndex = 0;
					} else if (angle > 120 && angle <= 240) {
						menu.settingsIndex = 1;
					} else if (angle > 240 && angle <= 360) {
						menu.settingsIndex = 2;
					} else if (angle >= -120 && angle < 0) {
						menu.settingsIndex = 2;
					} else if (angle >= -240 && angle < -120) {
						menu.settingsIndex = 1;
					} else if (angle >= -360 && angle < -240) {
						menu.settingsIndex = 0;
					} else {
					}
				} else {
				}
				this.setState({ menu });
			}
		);
	};

	componentDidMount() {
		this.containerElementOuter = this.controllerRef.current;
		this.activeRegionOuter = new ZingTouch.Region(this.containerElementOuter);
	}

	play = (songsList) => {
		if (
			this.state.menu.pageRender === "yes" &&
			this.state.screen.screenIndex === 7
		) {
			const { songIndex } = songsList;
			if (songsList.isPlaying) {
				songsList.isPlaying = false;
				songsList.songs[songIndex].pause();
			} else {
				songsList.isPlaying = true;
				songsList.songs[songIndex].play();
			}
			this.setState({ songsList });
		} else {
		}
	};

	nextSong = (songsList) => {
		if (
			this.state.menu.pageRender === "yes" &&
			this.state.screen.screenIndex === 7
		) {
			songsList.songs.map((song) => {
				song.pause();
				song.currentTime = 0;
				return [];
			});
			songsList.isPlaying = false;
			songsList.songIndex += 1;
			if (songsList.songIndex > songsList.songs.length - 1) {
				songsList.songIndex = 0;
			}
			songsList.songs[songsList.songIndex].play();
			songsList.isPlaying = true;
			this.setState({ songsList });
		} else {
		}
	};

	prevSong = (songsList) => {
		if (
			this.state.menu.pageRender === "yes" &&
			this.state.screen.screenIndex === 7
		) {
			songsList.songs.map((song) => {
				song.pause();
				song.currentTime = 0;
				return [];
			});
			songsList.isPlaying = false;
			songsList.songIndex -= 1;
			if (songsList.songIndex < 0) {
				songsList.songIndex = songsList.songs.length - 1;
			}
			songsList.songs[songsList.songIndex].play();
			songsList.isPlaying = true;
			this.setState({ songsList });
		} else {
		}
	};

	updateProgress = (event) => {
		if (
			this.state.menu.pageRender === "yes" &&
			this.state.screen.screenIndex === 7
		) {
			const { currentTime, duration } = event.srcElement;
			const progressPercent = (currentTime / duration) * 100;
			this.progressRef.current.style.width = progressPercent + "%";
		} else {
		}
	};

	render() {
		const { menu, screen, mouse, songsList, theme } = this.state;

		const styling = () => {
			if (theme.themeIndex === 0) {
				return "background-color: ''; transition: all 2s linear;";
			} else {
				return "background-color: black; transition: all 2s linear;";
			}
		};

		return (
			<div className="App">
				<Ipod
					screen={screen}
					menu={menu}
					mouse={mouse}
					songsList={songsList}
					theme={theme}
					isMenuVisible={this.isMenuVisible}
					addClass={this.addClass}
					removeClass={this.removeClass}
					tap={this.tap}
					rotate={this.rotate}
					play={this.play}
					nextSong={this.nextSong}
					prevSong={this.prevSong}
					updateProgress={this.updateProgress}
					controllerRef={this.controllerRef}
					progressRef={this.progressRef}
				/>
				<Helmet>
					<style>{`body { ${styling()} }`}</style>
				</Helmet>
			</div>
		);
	}
}

export default App;


