/* Ultimate Sub - owner-led bookmark-loaded Bondage Club mod */
(function () {
	"use strict";

	const MOD_ID = "UltimateSub";
	const MOD_NAME = "Ultimate Sub";
	const MOD_VERSION = "0.10.3";
	const PUBLIC_VERSION = "0.7.6";
	const STORAGE_KEY = "UltimateSub.Settings.v2";
	const LEGACY_STORAGE_KEY = "UltimateSub.Settings.v1";
	const VERSION_STORAGE_KEY = "UltimateSub.LastLoadedVersion";
	const VERSION_SAFETY_RESET_BEFORE = "0.9.9";
	const PROFILE_OWNER_BUTTON = { x: 1715, y: 685, w: 90, h: 90 };
	const TRAINING_DEFAULTS_VERSION = "0.2.2";
	const AUDIT_LOG_LIMIT = 250;
	const AUDIT_LOG_PAGE_SIZE = 10;
	const RESTRAINT_PRESET_LIMIT = 12;
	const STRIKE_POPUP_PRESET_BUTTONS = 3;
	const TRAINING_PRESENCE_CONTENT = "UltimateSubTrainingPresence";
	const TRAINING_PRESENCE_TTL = 90000;
	const AUDIT_FILTERS = [
		{ id: "all", label: "All" },
		{ id: "rp", label: "RP" },
		{ id: "owner", label: "Owner" },
		{ id: "training", label: "Training" },
		{ id: "tasks", label: "Tasks" },
		{ id: "locks", label: "Locks" },
		{ id: "security", label: "Security" },
		{ id: "system", label: "System" },
	];
	const RP_AROUSAL_MAX_EVENTS = 4;
	const RESTRAINT_GROUP_ALIASES = {
		mouth: "ItemMouth",
		mouth1: "ItemMouth",
		mouth2: "ItemMouth2",
		mouth3: "ItemMouth3",
		gag: "ItemMouth",
		gag1: "ItemMouth",
		gag2: "ItemMouth2",
		gag3: "ItemMouth3",
		arms: "ItemArms",
		hands: "ItemHands",
		legs: "ItemLegs",
		feet: "ItemFeet",
		boots: "ItemBoots",
		neck: "ItemNeck",
		collar: "ItemNeck",
		leash: "ItemNeckRestraints",
		neckrestraints: "ItemNeckRestraints",
		neckrestraint: "ItemNeckRestraints",
		head: "ItemHead",
		hood: "ItemHood",
		torso: "ItemTorso",
		breast: "ItemBreast",
		breasts: "ItemBreast",
		nipples: "ItemNipples",
		pelvis: "ItemPelvis",
		butt: "ItemButt",
		vulva: "ItemVulva",
		pussy: "ItemVulva",
		penis: "ItemPenis",
		misc: "ItemMisc",
		devices: "ItemDevices",
		device: "ItemDevices",
		handheld: "ItemHandheld",
		itemmouth: "ItemMouth",
		itemmouth2: "ItemMouth2",
		itemmouth3: "ItemMouth3",
		itemarms: "ItemArms",
		itemhands: "ItemHands",
		itemlegs: "ItemLegs",
		itemfeet: "ItemFeet",
		itemboots: "ItemBoots",
		itemneck: "ItemNeck",
		itemneckrestraints: "ItemNeckRestraints",
		itemhead: "ItemHead",
		itemhood: "ItemHood",
		itemtorso: "ItemTorso",
		itembreast: "ItemBreast",
		itemnipples: "ItemNipples",
		itempelvis: "ItemPelvis",
		itembutt: "ItemButt",
		itemvulva: "ItemVulva",
		itempenis: "ItemPenis",
		itemmisc: "ItemMisc",
		itemdevices: "ItemDevices",
		itemhandheld: "ItemHandheld",
	};
	const TRAINING_ACTION_TASKS = {
		kneel: {
			label: "Kneel",
			text: "Kneel for owner inspection.",
			completeText: "kneels for owner inspection",
		},
		stand: {
			label: "Stand",
			text: "Stand when released from kneeling.",
			completeText: "stands when ordered",
		},
		present: {
			label: "Present",
			text: "Present themself for owner inspection.",
			completeText: "presents themself for owner inspection",
		},
	};
	const RP_AROUSAL_MODES = ["off", "ownedPair", "everyone"];
	const RP_TARGET_STRENGTHS = ["light", "normal", "strong"];
	const RP_PERFORMER_STRENGTHS = ["off", "low", "normal"];
	const RP_AROUSAL_VERBS = [
		{ key: "lick", forms: ["lick", "licks", "licked", "licking"], target: 7, performer: 3 },
		{ key: "kiss", forms: ["kiss", "kisses", "kissed", "kissing"], target: 5, performer: 2 },
		{ key: "nibble", forms: ["nibble", "nibbles", "nibbled", "nibbling"], target: 5, performer: 2 },
		{ key: "bite", forms: ["bite", "bites", "bit", "biting"], target: 6, performer: 2 },
		{ key: "touch", forms: ["touch", "touches", "touched", "touching"], target: 4, performer: 1 },
		{ key: "caress", forms: ["caress", "caresses", "caressed", "caressing"], target: 5, performer: 2 },
		{ key: "rub", forms: ["rub", "rubs", "rubbed", "rubbing"], target: 7, performer: 3 },
		{ key: "grope", forms: ["grope", "gropes", "groped", "groping"], target: 8, performer: 3 },
		{ key: "spank", forms: ["spank", "spanks", "spanked", "spanking"], target: 7, performer: 2 },
		{ key: "tease", forms: ["tease", "teases", "teased", "teasing"], target: 6, performer: 3 },
		{ key: "stroke", forms: ["stroke", "strokes", "stroked", "stroking"], target: 6, performer: 2 },
		{ key: "grind", forms: ["grind", "grinds", "ground", "grinding"], target: 8, performer: 4 },
		{ key: "suck", forms: ["suck", "sucks", "sucked", "sucking"], target: 7, performer: 3 },
		{ key: "stick", forms: ["stick", "sticks", "stuck", "sticking"], target: 8, performer: 3 },
		{ key: "push", forms: ["push", "pushes", "pushed", "pushing"], target: 7, performer: 2 },
		{ key: "press", forms: ["press", "presses", "pressed", "pressing"], target: 6, performer: 2 },
		{ key: "slide", forms: ["slide", "slides", "slid", "sliding"], target: 7, performer: 3 },
		{ key: "thrust", forms: ["thrust", "thrusts", "thrusted", "thrusting"], target: 9, performer: 4 },
		{ key: "insert", forms: ["insert", "inserts", "inserted", "inserting"], target: 9, performer: 3 },
		{ key: "use", forms: ["use", "uses", "used", "using"], target: 5, performer: 2 },
		{ key: "fondle", forms: ["fondle", "fondles", "fondled", "fondling"], target: 7, performer: 3 },
		{ key: "grab", forms: ["grab", "grabs", "grabbed", "grabbing"], target: 6, performer: 2 },
		{ key: "pinch", forms: ["pinch", "pinches", "pinched", "pinching"], target: 5, performer: 2 },
		{ key: "scratch", forms: ["scratch", "scratches", "scratched", "scratching"], target: 4, performer: 1 },
		{ key: "tickle", forms: ["tickle", "tickles", "tickled", "tickling"], target: 5, performer: 2 },
		{ key: "massage", forms: ["massage", "massages", "massaged", "massaging"], target: 5, performer: 2 },
		{ key: "slap", forms: ["slap", "slaps", "slapped", "slapping", "smack", "smacks", "smacked", "smacking"], target: 7, performer: 2 },
		{ key: "pull", forms: ["pull", "pulls", "pulled", "pulling", "tug", "tugs", "tugged", "tugging"], target: 5, performer: 1 },
		{ key: "pet", forms: ["pet", "pets", "petted", "petting"], target: 4, performer: 1 },
		{ key: "nuzzle", forms: ["nuzzle", "nuzzles", "nuzzled", "nuzzling"], target: 4, performer: 2 },
		{ key: "hug", forms: ["hug", "hugs", "hugged", "hugging", "cuddle", "cuddles", "cuddled", "cuddling"], target: 4, performer: 2 },
		{ key: "squeeze", forms: ["squeeze", "squeezes", "squeezed", "squeezing"], target: 6, performer: 2 },
		{ key: "choke", forms: ["choke", "chokes", "choked", "choking"], target: 4, performer: 1 },
		{ key: "whisper", forms: ["whisper", "whispers", "whispered", "whispering"], target: 2, performer: 1 },
		{ key: "brush", forms: ["brush", "brushes", "brushed", "brushing"], target: 3, performer: 1 },
		{ key: "step", forms: ["step", "steps", "stepped", "stepping"], target: 4, performer: 1 },
		{ key: "kick", forms: ["kick", "kicks", "kicked", "kicking"], target: 3, performer: 1 },
		{ key: "finger", forms: ["finger", "fingers", "fingered", "fingering"], target: 9, performer: 3 },
		{ key: "fist", forms: ["fist", "fists", "fisted", "fisting"], target: 10, performer: 4 },
		{ key: "masturbate", forms: ["masturbate", "masturbates", "masturbated", "masturbating"], target: 9, performer: 4 },
		{ key: "penetrate", forms: ["penetrate", "penetrates", "penetrated", "penetrating"], target: 10, performer: 4 },
		{ key: "fuck", forms: ["fuck", "fucks", "fucked", "fucking"], target: 10, performer: 4 },
		{ key: "taste", forms: ["taste", "tastes", "tasted", "tasting"], target: 6, performer: 3 },
		{ key: "worship", forms: ["worship", "worships", "worshipped", "worshipping", "worshiped", "worshiping"], target: 6, performer: 3 },
		{ key: "flick", forms: ["flick", "flicks", "flicked", "flicking"], target: 5, performer: 2 },
	];
	const RP_ACTIVITY_KEYWORDS = {
		lick: ["lick", "kiss", "suck", "nibble"],
		kiss: ["kiss", "lick", "nibble"],
		nibble: ["nibble", "bite", "kiss"],
		bite: ["bite", "nibble"],
		touch: ["caress", "pet", "touch", "rub"],
		caress: ["caress", "pet", "touch", "rub"],
		rub: ["rub", "caress", "grope", "masturbate"],
		grope: ["grope", "grab", "rub", "caress"],
		spank: ["spank", "slap", "whip"],
		tease: ["tease", "tickle", "rub", "caress"],
		stroke: ["stroke", "rub", "caress"],
		grind: ["grind", "rub", "tease"],
		suck: ["suck", "lick", "kiss"],
		stick: ["masturbate", "tongue", "penetrate", "lick", "caress"],
		push: ["masturbate", "penetrate", "lick", "caress"],
		press: ["caress", "rub", "grope"],
		slide: ["masturbate", "rub", "caress", "lick"],
		thrust: ["masturbate", "penetrate", "caress"],
		insert: ["masturbate", "penetrate", "caress"],
		use: ["masturbate", "caress", "rub", "lick"],
		fondle: ["grope", "caress", "rub"],
		grab: ["grope", "collar", "caress"],
		pinch: ["pinch", "caress"],
		scratch: ["scratch", "caress"],
		tickle: ["tickle", "caress"],
		massage: ["massage", "caress", "rub"],
		slap: ["slap", "spank"],
		pull: ["pull", "caress"],
		pet: ["pet", "caress"],
		nuzzle: ["caress", "kiss", "rub"],
		hug: ["cuddle", "hug", "caress"],
		squeeze: ["grope", "caress"],
		choke: ["choke", "collar", "caress"],
		whisper: ["whisper", "caress"],
		brush: ["brush", "pet", "caress"],
		step: ["step", "spank", "caress"],
		kick: ["kick", "spank"],
		finger: ["masturbate", "caress"],
		fist: ["masturbate", "caress"],
		masturbate: ["masturbate", "caress", "rub"],
		penetrate: ["masturbate", "caress"],
		fuck: ["masturbate", "caress"],
		taste: ["lick", "kiss"],
		worship: ["kiss", "lick", "caress"],
		flick: ["tickle", "caress", "lick"],
	};
	const RP_FORCED_ACTIVITY_CANDIDATES = {
		lick: ["Lick", "Kiss", "Caress"],
		kiss: ["Kiss", "Lick", "Caress"],
		nibble: ["Nibble", "Bite", "Kiss"],
		bite: ["Bite", "Nibble"],
		touch: ["Caress", "Pet", "Lick"],
		caress: ["Caress", "Pet", "Lick"],
		rub: ["Caress", "Grope", "Lick"],
		grope: ["Grope", "Caress"],
		spank: ["Spank", "Slap"],
		tease: ["Caress", "Tickle", "Lick"],
		stroke: ["Caress", "Pet", "Lick"],
		grind: ["Caress", "Grope"],
		suck: ["Suck", "Lick", "Kiss"],
		stick: ["MasturbateTongue", "Lick", "Caress"],
		push: ["MasturbateTongue", "Caress", "Lick"],
		press: ["Caress", "Lick", "Grope"],
		slide: ["MasturbateTongue", "Caress", "Lick"],
		thrust: ["MasturbateTongue", "Caress"],
		insert: ["MasturbateTongue", "Caress", "Lick"],
		use: ["MasturbateTongue", "Caress", "Lick"],
		fondle: ["Grope", "Caress"],
		grab: ["Grope", "CollarGrab", "Caress"],
		pinch: ["Pinch", "Caress"],
		scratch: ["Scratch", "Caress"],
		tickle: ["Tickle", "Caress"],
		massage: ["MassageHands", "Caress"],
		slap: ["Slap", "Spank"],
		pull: ["Pull", "Caress"],
		pet: ["Pet", "Caress"],
		nuzzle: ["Caress", "Kiss"],
		hug: ["Cuddle", "Caress"],
		squeeze: ["Grope", "Caress"],
		choke: ["Choke", "CollarGrab", "Caress"],
		whisper: ["Whisper", "Caress"],
		brush: ["Pet", "Caress"],
		step: ["Step", "Spank", "Caress"],
		kick: ["Kick", "Spank"],
		finger: ["MasturbateHand", "Caress"],
		fist: ["MasturbateFist", "MasturbateHand", "Caress"],
		masturbate: ["MasturbateHand", "MasturbateTongue", "Caress"],
		penetrate: ["MasturbateTongue", "MasturbateHand", "Caress"],
		fuck: ["MasturbateTongue", "MasturbateHand", "Caress"],
		taste: ["Lick", "Kiss"],
		worship: ["Kiss", "Lick", "Caress"],
		flick: ["Tickle", "Lick", "Caress"],
	};
	const RP_BODY_ZONES = [
		{ zone: "ItemVulvaPiercings", label: "clit", words: ["clit", "clitoris", "clitty", "clitoral", "button", "pearl"] },
		{ zone: "ItemGlans", label: "tip", words: ["glans", "cock head", "penis head", "head of cock", "head of penis", "cocktip", "penis tip"] },
		{ zone: "ItemVulva", label: "intimate area", words: ["crotch", "sex", "pussy", "vulva", "vagina", "slit", "folds", "pussy lips", "lower lips", "cunt", "privates", "womanhood"] },
		{ zone: "ItemPenis", label: "penis", words: ["penis", "cock", "dick", "shaft", "member", "hardon", "erection", "balls", "testicles", "sack", "nuts", "bulge"] },
		{ zone: "ItemNipples", label: "nipples", words: ["nipple", "nipples", "nip", "nips", "areola", "areolas", "teat", "teats"] },
		{ zone: "ItemBreast", label: "chest", words: ["chest", "breast", "breasts", "boob", "boobs", "tit", "tits", "cleavage", "bust"] },
		{ zone: "ItemBoots", label: "feet", words: ["foot", "feet", "toe", "toes", "sole", "soles", "heel", "heels", "arch", "arches", "instep", "toenail", "toenails"] },
		{ zone: "ItemHands", label: "hands", words: ["hand", "hands", "finger", "fingers", "palm", "palms", "knuckle", "knuckles", "wrist", "wrists", "nail", "nails", "fingertip", "fingertips"] },
		{ zone: "ItemMouth", label: "mouth", words: ["mouth", "lips", "tongue", "teeth", "tooth", "jaw", "chin"] },
		{ zone: "ItemNeck", label: "neck", words: ["neck", "throat", "nape", "collar", "collarbone", "collarbones"] },
		{ zone: "ItemEars", label: "ears", words: ["ear", "ears", "earlobe", "earlobes"] },
		{ zone: "ItemNose", label: "nose", words: ["nose", "nostril", "nostrils"] },
		{ zone: "ItemHead", label: "head", words: ["head", "face", "cheek", "cheeks", "hair", "forehead", "scalp", "temple", "temples"] },
		{ zone: "ItemHood", label: "hood", words: ["hood", "helmet", "mask", "visor"] },
		{ zone: "ItemArms", label: "arms", words: ["arm", "arms", "elbow", "elbows", "forearm", "forearms", "upper arm", "upper arms", "bicep", "biceps", "shoulder", "shoulders", "armpit", "armpits"] },
		{ zone: "ItemLegs", label: "thighs", words: ["thigh", "thighs", "inner thigh", "inner thighs", "upper leg", "upper legs", "lap"] },
		{ zone: "ItemFeet", label: "legs", words: ["leg", "legs", "knee", "knees", "calf", "calves", "ankle", "ankles", "shin", "shins", "lower leg", "lower legs"] },
		{ zone: "ItemButt", label: "bottom", words: ["butt", "bottom", "rear", "ass", "backside", "behind", "ass cheek", "ass cheeks", "butt cheek", "butt cheeks", "anus", "asshole", "butthole", "rear hole"] },
		{ zone: "ItemPelvis", label: "pelvis", words: ["pelvis", "hip", "hips", "waist", "tummy", "lower belly", "lower stomach"] },
		{ zone: "ItemTorso", label: "body", words: ["body", "torso", "belly", "stomach", "back", "abdomen", "midriff", "ribs", "rib", "side", "sides"] },
	];
	const RP_ACTIVITY_MARKER = "UltimateSubRpArousal";
	const RP_INTENSITY_WORDS = {
		strong: ["passionately", "hungrily", "eagerly", "deep", "deeply", "hard", "roughly", "firmly", "desperately"],
		soft: ["softly", "gently", "lightly", "barely", "tenderly"],
	};

	const SCENE_MODES = {
		none: {
			name: "None",
			description: "No active scene preset.",
		},
		training: {
			name: "Training",
			description: "Owner-led practice mode. UltraBC escape tools are locked.",
		},
		public: {
			name: "Public Display",
			description: "Public room protocol. UltraBC escape tools are locked.",
		},
		quiet: {
			name: "Quiet",
			description: "Low-noise protocol marker for the current scene.",
		},
		aftercare: {
			name: "Aftercare",
			description: "Cooldown mode. UltraBC escape tools are allowed.",
		},
	};

	const defaultTrainingSettings = {
		defaultsVersion: TRAINING_DEFAULTS_VERSION,
		forceKneel: false,
		lockUltraBc: false,
		lockWardrobe: false,
		honorific: "off",
		honorificStrikes: 0,
		strikeThreshold: 3,
		strikeAlertsEnabled: true,
		lastStrikeAlertCount: 0,
		announceStart: false,
		appliedUltraBcLock: false,
		appliedWardrobeLock: false,
	};
	const defaultRpArousalSettings = {
		mode: "everyone",
		targetStrength: "normal",
		performerStrength: "low",
		feedback: false,
		externalTargets: true,
		logMisses: false,
		lastEvent: "No RP arousal detected yet.",
	};

	const defaultSettings = {
		enabled: true,
		localEmergencyPaused: false,
		ultraBcEscapeToolsLocked: false,
		ultraBcAutoRelockAt: 0,
		wardrobeCommandLocked: false,
		sceneMode: "none",
		training: { ...defaultTrainingSettings },
		rpArousal: { ...defaultRpArousalSettings },
		tasks: [],
		tokens: [],
		restraints: {
			presets: [],
		},
		auditLog: [],
		showDebugInfo: false,
	};

	let startupTrainingDefaultsReset = false;
	let settings = loadSettings();
	let startupVersionSafetyReset = shouldApplyVersionSafetyReset();
	let uiState = {
		tab: "status",
		message: "",
		logFilter: "all",
		logPage: 0,
	};
	let strikePopup = {
		active: false,
		target: null,
		strikes: 0,
		reason: "",
		presets: [],
		message: "",
		pendingAt: 0,
		pendingLabel: "",
	};
	let remotePanel = {
		active: false,
		target: null,
		message: "",
		pendingAt: 0,
		pendingLabel: "",
		wardrobeCommandLocked: null,
		ultraBcEscapeToolsLocked: null,
		openTaskCount: null,
		currentTaskText: "",
		savedRestraintCount: null,
		lastTrainingEvent: "",
		training: null,
		rpArousal: null,
		restraints: null,
		view: "main",
	};
	let trainingPresence = {};
	let lastTrainingPresenceBroadcastAt = 0;
	let lastTrainingPresenceBroadcastKey = "";
	let profileIconMessage = "";
	let modApi = null;
	let bcxApi = null;
	let lastUltraBcBlockNoticeAt = 0;
	let lastWardrobeBlockNoticeAt = 0;
	let lastHonorificBlockNoticeAt = 0;
	let lastTrainingTaskBlockNoticeAt = 0;
	let lastRpArousalMessageKey = "";

	function beacon(stage) {
		try {
			const image = new Image();
			image.src = `http://127.0.0.1:8787/ultimate-sub-stage/${encodeURIComponent(stage)}?t=${Date.now()}`;
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not send diagnostic beacon`, error);
		}
	}

	function log(...args) {
		console.log(`[${MOD_NAME}]`, ...args);
	}

	function notify(message) {
		log(message);
		if (typeof alert === "function") {
			setTimeout(() => alert(message), 50);
		}
	}

	function loadSettings() {
		let stored = {};
		try {
			stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {};
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not load saved settings`, error);
		}

		if (!Object.keys(stored).length) {
			try {
				const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY) || "{}") || {};
				stored = migrateLegacySettings(legacy);
			} catch (error) {
				console.warn(`[${MOD_NAME}] Could not migrate legacy settings`, error);
			}
		}

		return normalizeSettings({ ...defaultSettings, ...stored });
	}

	function migrateLegacySettings(legacy) {
		return {
			enabled: legacy.enabled !== false,
			localEmergencyPaused: false,
			ultraBcEscapeToolsLocked: legacy.ultraBcEscapeToolsLocked === true,
			wardrobeCommandLocked: false,
			sceneMode: "none",
			training: { ...defaultTrainingSettings },
			rpArousal: { ...defaultRpArousalSettings },
			showDebugInfo: legacy.showDebugInfo === true,
			tasks: [],
			tokens: [],
			restraints: { presets: [] },
			auditLog: [],
		};
	}

	function normalizeSettings(nextSettings) {
		const normalized = { ...defaultSettings, ...nextSettings };
		if (!SCENE_MODES[normalized.sceneMode]) normalized.sceneMode = "none";
		const resetTrainingDefaults = shouldResetTrainingDefaults(normalized.training);
		const oldTraining = normalized.training && typeof normalized.training === "object" ? normalized.training : {};
		normalized.training = normalizeTrainingSettings(normalized.training, resetTrainingDefaults);
		if (resetTrainingDefaults) {
			startupTrainingDefaultsReset = true;
			if (normalized.sceneMode === "training") normalized.sceneMode = "none";
			if (oldTraining.appliedUltraBcLock === true || nextSettings.sceneMode === "training") {
				normalized.ultraBcEscapeToolsLocked = false;
				normalized.ultraBcAutoRelockAt = 0;
			}
			if (oldTraining.appliedWardrobeLock === true || nextSettings.sceneMode === "training") {
				normalized.wardrobeCommandLocked = false;
			}
		}
		if (normalized.sceneMode !== "training") {
			normalized.training.appliedUltraBcLock = false;
			normalized.training.appliedWardrobeLock = false;
		}
		if (!Array.isArray(normalized.tasks)) normalized.tasks = [];
		if (!Array.isArray(normalized.tokens)) normalized.tokens = [];
		normalized.restraints = normalizeRestraintSettings(normalized.restraints);
		if (!Array.isArray(normalized.auditLog)) normalized.auditLog = [];
		normalized.rpArousal = normalizeRpArousalSettings(normalized.rpArousal);
		normalized.tasks = normalized.tasks.slice(0, 12);
		normalized.tokens = normalized.tokens.slice(0, 12);
		normalized.auditLog = normalized.auditLog.map(normalizeAuditEntry).slice(-AUDIT_LOG_LIMIT);
		normalized.ultraBcAutoRelockAt = Number(normalized.ultraBcAutoRelockAt) || 0;
		return normalized;
	}

	function shouldResetTrainingDefaults(training) {
		if (!training || typeof training !== "object") return false;
		return training.defaultsVersion !== TRAINING_DEFAULTS_VERSION;
	}

	function normalizeTrainingSettings(training, resetTrainingDefaults) {
		const normalized = {
			...defaultTrainingSettings,
			...(training && typeof training === "object" ? training : {}),
		};
		if (resetTrainingDefaults) {
			normalized.forceKneel = false;
			normalized.lockUltraBc = false;
			normalized.lockWardrobe = false;
			normalized.honorific = "off";
			normalized.honorificStrikes = 0;
			normalized.announceStart = false;
			normalized.appliedUltraBcLock = false;
			normalized.appliedWardrobeLock = false;
		}
		normalized.defaultsVersion = TRAINING_DEFAULTS_VERSION;
		normalized.forceKneel = normalized.forceKneel === true;
		normalized.lockUltraBc = normalized.lockUltraBc === true;
		normalized.lockWardrobe = normalized.lockWardrobe === true;
		normalized.announceStart = normalized.announceStart === true;
		normalized.appliedUltraBcLock = normalized.appliedUltraBcLock === true;
		normalized.appliedWardrobeLock = normalized.appliedWardrobeLock === true;
		normalized.honorific = normalizeHonorific(normalized.honorific) || "off";
		normalized.honorificStrikes = clampNumber(Number(normalized.honorificStrikes) || 0, 0, 99);
		normalized.strikeThreshold = clampNumber(Number(normalized.strikeThreshold) || 3, 1, 20);
		normalized.strikeAlertsEnabled = normalized.strikeAlertsEnabled !== false;
		normalized.lastStrikeAlertCount = clampNumber(Number(normalized.lastStrikeAlertCount) || 0, 0, 99);
		return normalized;
	}

	function normalizeRestraintSettings(restraints) {
		const normalized = restraints && typeof restraints === "object" ? restraints : {};
		const presets = Array.isArray(normalized.presets) ? normalized.presets : [];
		return {
			presets: presets.map(normalizeRestraintPreset).filter(Boolean).slice(-RESTRAINT_PRESET_LIMIT),
		};
	}

	function normalizeRestraintPreset(preset) {
		if (!preset || typeof preset !== "object") return null;
		const group = normalizeRestraintGroupName(preset.group);
		const asset = String(preset.asset || "").trim();
		if (!group || !asset) return null;
		return {
			id: String(preset.id || newId("restraint")),
			label: fitText(String(preset.label || `${group} ${asset}`), 34),
			group,
			asset,
			color: clonePlain(preset.color),
			difficulty: Number(preset.difficulty) || 0,
			property: clonePlain(preset.property),
			craft: clonePlain(preset.craft),
			createdAt: Number(preset.createdAt) || Date.now(),
		};
	}

	function normalizeRestraintGroupName(value) {
		const text = String(value || "").trim();
		if (!text) return "";
		const compact = text.toLowerCase().replace(/[^a-z0-9]/g, "");
		if (RESTRAINT_GROUP_ALIASES[compact]) return RESTRAINT_GROUP_ALIASES[compact];
		const knownGroup = Object.values(RESTRAINT_GROUP_ALIASES).find((group) => group.toLowerCase() === text.toLowerCase());
		if (knownGroup) return knownGroup;
		if (/^item[a-z0-9]+$/i.test(text)) return `Item${text.slice(4)}`;
		return "";
	}

	function clonePlain(value) {
		if (value === undefined || value === null) return undefined;
		try {
			return JSON.parse(JSON.stringify(value));
		} catch (error) {
			return undefined;
		}
	}

	function normalizeRpArousalSettings(rpArousal) {
		const normalized = {
			...defaultRpArousalSettings,
			...(rpArousal && typeof rpArousal === "object" ? rpArousal : {}),
		};
		if (!RP_AROUSAL_MODES.includes(normalized.mode)) normalized.mode = defaultRpArousalSettings.mode;
		if (normalized.externalTargets !== true) normalized.mode = "everyone";
		if (!RP_TARGET_STRENGTHS.includes(normalized.targetStrength)) normalized.targetStrength = defaultRpArousalSettings.targetStrength;
		if (!RP_PERFORMER_STRENGTHS.includes(normalized.performerStrength)) normalized.performerStrength = defaultRpArousalSettings.performerStrength;
		normalized.feedback = false;
		normalized.externalTargets = true;
		normalized.logMisses = normalized.logMisses === true;
		normalized.lastEvent = fitText(normalized.lastEvent || defaultRpArousalSettings.lastEvent, 120);
		return normalized;
	}

	function saveSettings() {
		settings = normalizeSettings(settings);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
	}

	function drawMenu() {
		cleanupTimedState();

		DrawCharacter(Player, 15, 95, 0.72);
		drawVersionBadge();
		DrawText(MOD_NAME, 1180, 125, "Black", "Gray");
		DrawText("Owner-led relationship control center", 1180, 170, "Black", "Gray");

		DrawButton(1865, 70, 90, 90, "X", "White", "", "Close Ultimate Sub");
		drawTabs();

		if (uiState.tab === "status") drawStatusTab();
		if (uiState.tab === "owner") drawOwnerToolsTab();
		if (uiState.tab === "tasks") drawTasksTab();
		if (uiState.tab === "rp") drawRpArousalTab();
		if (uiState.tab === "log") drawLogTab();

		drawFooter();
	}

	function drawVersionBadge() {
		DrawButton(
			850,
			18,
			600,
			58,
			`Version ${PUBLIC_VERSION}`,
			"#F6F6F6",
			"",
			`${MOD_NAME} version`
		);
	}

	function drawTabs() {
		getMenuTabs().forEach((tab) => drawTab(tab.label, tab.id, tab.x));
	}

	function drawTab(label, tab, x) {
		DrawButton(
			x,
			215,
			220,
			55,
			label,
			uiState.tab === tab ? "#D9E8FF" : "White",
			"",
			`Open ${label}`
		);
	}

	function getMenuTabs() {
		return [
			{ id: "status", label: "Status", x: 500 },
			{ id: "owner", label: "Owner Tools", x: 735 },
			{ id: "tasks", label: "Tasks", x: 970 },
			{ id: "rp", label: "RP Arousal", x: 1205 },
			{ id: "log", label: "Log", x: 1440 },
		];
	}

	function drawStatusTab() {
		const ownerNumber = getFullOwnerMemberNumber();
		const scene = SCENE_MODES[settings.sceneMode] || SCENE_MODES.none;
		const ownerStatus = ownerNumber ? `Full BC owner: #${ownerNumber}` : "Full BC owner: none detected";
		const commandStatus = settings.localEmergencyPaused
			? "Owner commands: locally paused"
			: "Owner commands: accepted automatically";
		const ultraBcStatus = settings.ultraBcEscapeToolsLocked
			? "UltraBC escape tools: locked"
			: "UltraBC escape tools: allowed";
		const wardrobeStatus = getWardrobeCommandStatusText();
		const trainingStatus = buildTrainingStatusLine();
		const activeTasks = settings.tasks.filter((task) => !task.done).length;
		const activeTokens = getActiveTokens().length;
		const bcxStatus = getBcxStatus(ownerNumber);

		drawLabelLines([
			ownerStatus,
			commandStatus,
			ultraBcStatus,
			wardrobeStatus,
			`Scene preset: ${scene.name}`,
			trainingStatus,
			buildRpArousalStatusLine(),
			`Open tasks: ${activeTasks}`,
			`Active permission tokens: ${activeTokens}`,
			`BCX: ${bcxStatus}`,
			`UltraBC: ${detectUltraBc() ? "detected" : "not detected"}`,
		], 900, 315, 38);

		drawLabelLines([
			scene.description,
			"The verified full owner controls the mod with chat or whisper commands.",
		], 980, 765, 38);

		if (settings.showDebugInfo) {
			drawLabelLines([
				`Character: ${Player && Player.Name ? Player.Name : "Unknown"}`,
				`Member #: ${Player && Player.MemberNumber ? Player.MemberNumber : "Unknown"}`,
				`Auto relock: ${settings.ultraBcAutoRelockAt ? formatTime(settings.ultraBcAutoRelockAt) : "none"}`,
			], 1450, 335, 42);
		}

		if (settings.localEmergencyPaused) {
			DrawButton(1260, 720, 390, 65, "Resume owner mode", "Pink", "", "Resume owner commands");
		}
	}

	function drawOwnerToolsTab() {
		drawLabelLines([
			"Owner button controls",
			"Remote owner panel",
			"UltraBC escape lock",
			"Wardrobe command toggle",
			"Scene presets",
			"Task controls",
			"Permission tokens",
			"Status request",
		], 760, 325, 44);

		drawLabelLines([
			"Task and token commands",
			"USCMD task add <task text>",
			"USCMD task done <number>",
			"USCMD task clear",
			"USCMD token grant escape <minutes>",
			"USCMD token grant wardrobe <minutes>",
			"USCMD token revoke <number>",
			"USCMD token clear",
		], 1300, 325, 44);

		drawLabelLines([
			"Only the assigned full BC owner is accepted. Other players' Ultimate Sub commands are ignored and logged.",
			"An escape token temporarily allows UltraBC escape tools, then relocks them when the timer expires.",
			"A wardrobe token temporarily allows /wardrobe and /wrobe while the wardrobe command is locked.",
		], 1060, 770, 38);
	}

	function drawTasksTab() {
		const activeTasks = settings.tasks.filter((task) => !task.done);
		const completedTasks = settings.tasks.filter((task) => task.done);

		DrawText("Open Tasks", 850, 320, "Black", "Gray");
		if (!activeTasks.length) {
			DrawText("No open owner tasks.", 850, 385, "Black", "Gray");
		} else {
			activeTasks.slice(0, 7).forEach((task, index) => {
				DrawText(`${taskIndex(task)}. ${fitText(task.text, 50)}`, 900, 385 + index * 45, "Black", "Gray");
			});
		}

		DrawText("Permission Tokens", 1430, 320, "Black", "Gray");
		const activeTokens = getActiveTokens();
		if (!activeTokens.length) {
			DrawText("No active owner tokens.", 1430, 385, "Black", "Gray");
		} else {
			activeTokens.slice(0, 7).forEach((token, index) => {
				DrawText(`${tokenIndex(token)}. ${fitText(token.label, 30)} until ${formatTime(token.expiresAt)}`, 1430, 385 + index * 45, "Black", "Gray");
			});
		}

		DrawText("Recently Completed", 850, 735, "Black", "Gray");
		if (!completedTasks.length) {
			DrawText("Nothing completed yet.", 850, 795, "Black", "Gray");
		} else {
			completedTasks.slice(-3).reverse().forEach((task, index) => {
				DrawText(`${taskIndex(task)}. ${fitText(task.text, 50)}`, 900, 795 + index * 45, "Black", "Gray");
			});
		}
	}

	function drawRpArousalTab() {
		const rp = settings.rpArousal;
		DrawText("RP Arousal Parser", 820, 320, "Black", "Gray");
		drawLabelLines([
			"Turns selected room emotes into BC activity arousal for the named target.",
			"The emoter needs Ultimate Sub loaded; the target can be a normal BC client.",
			"Owned Pair limits targets to owner/sub pairs. Everyone allows any named room target.",
			"Now reads several actions in one emote and follows her/him/them inside that same emote.",
		], 1030, 365, 38);

		DrawButton(710, 555, 410, 65, `Mode: ${getRpArousalModeDisplay(rp.mode)}`, rp.mode === "off" ? "White" : "#D9E8FF", "", "Cycle RP arousal mode");
		DrawButton(710, 640, 410, 65, `Target: ${capitalize(rp.targetStrength)}`, "White", "", "Cycle target arousal strength");
		DrawButton(710, 725, 410, 65, `Performer: ${capitalize(rp.performerStrength)}`, "White", "", "Cycle performer arousal strength");
		DrawButton(710, 810, 410, 65, `Miss Logs: ${rp.logMisses ? "On" : "Off"}`, rp.logMisses ? "#D9E8FF" : "White", "", "Log RP emotes that Ultimate Sub could not parse");

		DrawText("Last RP Hit", 1425, 565, "Black", "Gray");
		drawLabelLines([
			rp.lastEvent || defaultRpArousalSettings.lastEvent,
			"Example: Valerie licks Valeria's leg passionately.",
			"The target receives the larger effect. The performer receives the smaller effect unless Performer is Off.",
		], 1425, 625, 38);
	}

	function drawLogTab() {
		const filter = getCurrentAuditFilter();
		const filtered = getFilteredAuditLog(filter.id);
		const pageCount = getAuditPageCount(filtered);
		const page = clampNumber(uiState.logPage || 0, 0, pageCount - 1);
		uiState.logPage = page;

		DrawButton(610, 300, 260, 58, `View: ${filter.label}`, "White", "", "Cycle log category");
		DrawButton(900, 300, 210, 58, "Newer", page > 0 ? "White" : "#DDDDDD", "", "Show newer log page");
		DrawButton(1135, 300, 210, 58, "Older", page < pageCount - 1 ? "White" : "#DDDDDD", "", "Show older log page");
		DrawText(`Page ${page + 1}/${pageCount} - ${filtered.length} entries`, 1530, 330, "Black", "Gray");

		if (!filtered.length) {
			DrawText("No log entries in this view.", 1180, 475, "Black", "Gray");
			return;
		}

		filtered.slice(page * AUDIT_LOG_PAGE_SIZE, (page + 1) * AUDIT_LOG_PAGE_SIZE).forEach((entry, index) => {
			const y = 395 + index * 50;
			const actor = entry.actor ? `#${entry.actor}` : "local";
			const category = getAuditCategoryLabel(entry.category);
			DrawText(`${formatTime(entry.time)} [${category}] ${actor}: ${fitText(entry.action, 46)}`, 1180, y, "Black", "Gray");
			if (entry.detail) {
				DrawText(fitText(entry.detail, 70), 1200, y + 24, "Black", "Gray");
			}
		});
	}

	function getCurrentAuditFilter() {
		return AUDIT_FILTERS.find((filter) => filter.id === uiState.logFilter) || AUDIT_FILTERS[0];
	}

	function getFilteredAuditLog(filterId) {
		const entries = settings.auditLog.map(normalizeAuditEntry).slice().reverse();
		if (!filterId || filterId === "all") return entries;
		return entries.filter((entry) => entry.category === filterId);
	}

	function getAuditPageCount(entries) {
		return Math.max(1, Math.ceil((entries || []).length / AUDIT_LOG_PAGE_SIZE));
	}

	function getAuditCategoryLabel(category) {
		const filter = AUDIT_FILTERS.find((entry) => entry.id === category);
		return filter ? filter.label : "Owner";
	}

	function drawFooter() {
		DrawButton(690, 905, 350, 60, "Emergency reset", "White", "", "Pause owner commands and unlock UltraBC");
		DrawButton(
			1070,
			905,
			260,
			60,
			`Debug: ${settings.showDebugInfo ? "On" : "Off"}`,
			"White",
			"",
			"Toggle debug info"
		);

		if (uiState.message) {
			DrawText(fitText(uiState.message, 65), 1540, 935, "Black", "Gray");
		}
	}

	function drawLabelLines(lines, x, y, gap) {
		lines.forEach((line, index) => {
			DrawText(fitText(String(line), 78), x, y + index * gap, "Black", "Gray");
		});
	}

	function handleClick() {
		if (MouseIn(1865, 70, 90, 90)) {
			closeUltimateSubMenu();
			return;
		}

		for (const tab of getMenuTabs()) {
			if (MouseIn(tab.x, 215, 220, 55)) {
				uiState.tab = tab.id;
				uiState.message = "";
				return;
			}
		}

		if (uiState.tab === "rp" && handleRpArousalTabClick()) {
			return;
		}

		if (uiState.tab === "log" && handleLogTabClick()) {
			return;
		}

		if (uiState.tab === "status" && settings.localEmergencyPaused && MouseIn(1260, 720, 390, 65)) {
			settings.enabled = true;
			settings.localEmergencyPaused = false;
			addAudit("Owner mode resumed locally.", "");
			saveSettings();
			uiState.message = "Owner mode resumed.";
			return;
		}

		if (MouseIn(690, 905, 350, 60)) {
			emergencyReset();
			return;
		}

		if (MouseIn(1070, 905, 260, 60)) {
			settings.showDebugInfo = !settings.showDebugInfo;
			saveSettings();
			uiState.message = settings.showDebugInfo ? "Debug info shown." : "Debug info hidden.";
		}
	}

	function handleRpArousalTabClick() {
		if (MouseIn(710, 555, 410, 65)) {
			settings.rpArousal.mode = nextCycleValue(RP_AROUSAL_MODES, settings.rpArousal.mode);
			saveSettings();
			uiState.message = `RP Arousal mode: ${getRpArousalModeDisplay(settings.rpArousal.mode)}.`;
			return true;
		}
		if (MouseIn(710, 640, 410, 65)) {
			settings.rpArousal.targetStrength = nextCycleValue(RP_TARGET_STRENGTHS, settings.rpArousal.targetStrength);
			saveSettings();
			uiState.message = `RP target effect: ${settings.rpArousal.targetStrength}.`;
			return true;
		}
		if (MouseIn(710, 725, 410, 65)) {
			settings.rpArousal.performerStrength = nextCycleValue(RP_PERFORMER_STRENGTHS, settings.rpArousal.performerStrength);
			saveSettings();
			uiState.message = `RP performer effect: ${settings.rpArousal.performerStrength}.`;
			return true;
		}
		if (MouseIn(710, 810, 410, 65)) {
			settings.rpArousal.logMisses = !settings.rpArousal.logMisses;
			saveSettings();
			uiState.message = settings.rpArousal.logMisses ? "RP miss logs enabled." : "RP miss logs disabled.";
			return true;
		}
		return false;
	}

	function handleLogTabClick() {
		const filtered = getFilteredAuditLog(uiState.logFilter);
		const pageCount = getAuditPageCount(filtered);
		if (MouseIn(610, 300, 260, 58)) {
			uiState.logFilter = nextCycleValue(AUDIT_FILTERS.map((filter) => filter.id), uiState.logFilter || "all");
			uiState.logPage = 0;
			uiState.message = `Log view: ${getCurrentAuditFilter().label}.`;
			return true;
		}
		if (MouseIn(900, 300, 210, 58)) {
			uiState.logPage = clampNumber((uiState.logPage || 0) - 1, 0, pageCount - 1);
			return true;
		}
		if (MouseIn(1135, 300, 210, 58)) {
			uiState.logPage = clampNumber((uiState.logPage || 0) + 1, 0, pageCount - 1);
			return true;
		}
		return false;
	}

	function drawProfileOwnerButtonIfNeeded() {
		const target = getInformationSheetTarget();
		const access = getRemoteOwnerAccess(target);
		if (!access.visible) return;

		DrawButton(
			PROFILE_OWNER_BUTTON.x,
			PROFILE_OWNER_BUTTON.y,
			PROFILE_OWNER_BUTTON.w,
			PROFILE_OWNER_BUTTON.h,
			"",
			access.active ? "White" : "#DDDDDD",
			"",
			access.tooltip
		);
		drawUltimateSubIcon(PROFILE_OWNER_BUTTON.x, PROFILE_OWNER_BUTTON.y, !access.active);

		if (profileIconMessage) {
			DrawText(fitText(profileIconMessage, 38), 1580, 790, "Black", "Gray");
		}
	}

	function handleInformationSheetClick(args, next) {
		if (remotePanel.active) {
			handleRemoteOwnerPanelClick();
			return;
		}

		const target = getInformationSheetTarget();
		const access = getRemoteOwnerAccess(target);
		if (access.visible && MouseIn(PROFILE_OWNER_BUTTON.x, PROFILE_OWNER_BUTTON.y, PROFILE_OWNER_BUTTON.w, PROFILE_OWNER_BUTTON.h)) {
			if (access.active) {
				openRemoteOwnerPanel(target);
			} else {
				profileIconMessage = access.reason;
			}
			return;
		}

		return next(args);
	}

	function getInformationSheetTarget() {
		if (typeof InformationSheetSelection === "undefined") return null;
		if (!InformationSheetSelection || typeof InformationSheetSelection.MemberNumber !== "number") return null;
		return InformationSheetSelection;
	}

	function getRemoteOwnerAccess(target) {
		if (!target || !Player || !Player.MemberNumber || target.MemberNumber === Player.MemberNumber) {
			return {
				visible: false,
				active: false,
				reason: "",
				tooltip: "Ultimate Sub owner panel",
			};
		}

		if (isTargetOwnedByPlayer(target)) {
			return {
				visible: true,
				active: true,
				reason: "",
				tooltip: "Open Ultimate Sub owner panel",
			};
		}

		return {
			visible: true,
			active: false,
			reason: "Ultimate Sub: target is not owned by you.",
			tooltip: "Ultimate Sub locked: target is not owned by you",
		};
	}

	function canOpenRemoteOwnerPanel(target) {
		return getRemoteOwnerAccess(target).active;
	}

	function isTargetOwnedByPlayer(target) {
		if (!target || !Player || !Player.MemberNumber) return false;
		if (typeof target.IsFullyOwnedByPlayer === "function" && target.IsFullyOwnedByPlayer()) return true;
		if (typeof target.IsOwnedByMemberNumber === "function" && target.IsOwnedByMemberNumber(Player.MemberNumber)) return true;
		if (typeof target.OwnerNumber === "function" && target.OwnerNumber() === Player.MemberNumber) return true;
		return Boolean(target.Ownership && target.Ownership.MemberNumber === Player.MemberNumber);
	}

	function openRemoteOwnerPanel(target) {
		profileIconMessage = "";
		remotePanel = {
			active: true,
			target: {
				character: target,
				memberNumber: target.MemberNumber,
			name: target.Name || "Unknown",
			},
			message: "Owner panel opened. Buttons send private Ultimate Sub commands.",
			pendingAt: 0,
			pendingLabel: "",
			wardrobeCommandLocked: null,
			ultraBcEscapeToolsLocked: null,
			openTaskCount: null,
			currentTaskText: "",
			savedRestraintCount: null,
			lastTrainingEvent: "",
			training: null,
			rpArousal: null,
			restraints: null,
			view: "main",
		};
	}

	function closeRemoteOwnerPanel() {
		remotePanel.active = false;
		remotePanel.message = "";
		remotePanel.pendingAt = 0;
		remotePanel.pendingLabel = "";
		remotePanel.view = "main";
	}

	function drawRemoteOwnerPanel() {
		const target = remotePanel.target;
		if (!target) {
			closeRemoteOwnerPanel();
			return;
		}
		updateRemotePendingMessage();

		if (target.character) {
			DrawCharacter(target.character, 50, 70, 0.86);
		}

		DrawText(`${MOD_NAME} Owner Panel`, 1080, 105, "Black", "Gray");
		DrawText(`${target.name} (#${target.memberNumber})`, 1080, 150, "Black", "Gray");
		DrawText("Full owner access sends private commands to the target's loaded Ultimate Sub.", 1080, 195, "Black", "Gray");
		DrawButton(1815, 75, 90, 90, "X", "White", "", "Return to profile");

		getActiveRemotePanelButtons().forEach((button) => {
			DrawButton(button.x, button.y, button.w, button.h, button.label, button.color || "White", "", button.tooltip || button.label);
		});

		drawUltimateSubIcon(520, 110, false);
		if (remotePanel.view === "training") {
			drawRemoteTrainingNotes();
		} else if (remotePanel.view === "trainingDashboard") {
			drawRemoteTrainingDashboard();
		} else if (remotePanel.view === "rp") {
			drawRemoteRpArousalNotes();
		} else if (remotePanel.view === "restraints") {
			drawRemoteRestraintNotes();
		} else {
			drawLabelLines([
				"Remote access only works while you and the target are in the same chat room.",
				"The target must have Ultimate Sub loaded for commands to apply.",
				"Responses appear here after their mod whispers back.",
			], 545, 820, 38);
		}

		if (remotePanel.message) {
			DrawText(fitText(remotePanel.message, 82), 1130, 930, "Black", "Gray");
		}
	}

	function getActiveRemotePanelButtons() {
		if (remotePanel.view === "trainingDashboard") return getRemoteTrainingDashboardButtons();
		if (remotePanel.view === "training") return getRemoteTrainingButtons();
		if (remotePanel.view === "rp") return getRemoteRpArousalButtons();
		if (remotePanel.view === "restraints") return getRemoteRestraintButtons();
		return getRemotePanelButtons();
	}

	function getRemotePanelButtons() {
		const wardrobeToggle = getRemoteWardrobeToggleButton();
		return [
			{ x: 500, y: 280, w: 430, h: 65, label: "Request Status", command: "status" },
			{ x: 500, y: 365, w: 430, h: 65, label: "Lock UltraBC Escape", command: "ubc lock", color: "Pink" },
			{ x: 500, y: 450, w: 430, h: 65, label: "Allow UltraBC Escape", command: "ubc unlock" },
			{ x: 500, y: 535, w: 430, h: 65, label: "Grant Escape Token", prompt: "Minutes for escape token?", build: (value) => `token grant escape ${value || 10}` },
			{ x: 500, y: 620, w: 430, h: 65, label: "Revoke Token #", prompt: "Token number to revoke?", build: (value) => `token revoke ${value || 1}` },
			{ x: 500, y: 705, w: 430, h: 65, label: "Clear Tokens", command: "token clear" },
			{ x: 1020, y: 280, w: 430, h: 65, label: "Training Dashboard", localAction: "trainingDashboard", color: "#D9E8FF", tooltip: "Open Training dashboard" },
			{ x: 1020, y: 365, w: 430, h: 65, label: "Scene: Public", command: "scene public", color: "#D9E8FF" },
			{ x: 1020, y: 450, w: 430, h: 65, label: "Scene: Quiet", command: "scene quiet", color: "#D9E8FF" },
			{ x: 1020, y: 535, w: 430, h: 65, label: "Scene: Aftercare", command: "scene aftercare" },
			{ x: 1020, y: 620, w: 430, h: 65, label: "Scene: Off", command: "scene off" },
			{ x: 1020, y: 705, w: 430, h: 65, label: "RP Arousal", localAction: "rp", color: "#D9E8FF", tooltip: "Open RP Arousal controls" },
			{ x: 1510, y: 280, w: 330, h: 65, label: "Add Task", prompt: "Task text?", build: (value) => value ? `task add ${value}` : "" },
			{ x: 1510, y: 365, w: 330, h: 65, label: "Complete Task #", prompt: "Task number to complete?", build: (value) => `task done ${value || 1}` },
			{ x: 1510, y: 450, w: 330, h: 65, label: "Clear Tasks", command: "task clear" },
			{ x: 1510, y: 535, w: 330, h: 65, label: "View Tasks", command: "task list", color: "#D9E8FF" },
			{ x: 1510, y: 705, w: 330, h: 65, label: "Restraints", localAction: "restraints", color: "#D9E8FF", tooltip: "Open saved punishment restraints" },
			wardrobeToggle,
		];
	}

	function getRemoteTrainingDashboardButtons() {
		return [
			{ x: 500, y: 690, w: 300, h: 60, label: "Start Training", command: "training start", color: "Pink" },
			{ x: 830, y: 690, w: 300, h: 60, label: "End Training", command: "training end" },
			{ x: 1160, y: 690, w: 300, h: 60, label: "Refresh", command: "status", color: "#D9E8FF" },
			{ x: 1490, y: 690, w: 300, h: 60, label: "View Tasks", command: "task list", color: "#D9E8FF" },
			{ x: 500, y: 770, w: 430, h: 60, label: "Training Controls", localAction: "training", color: "#D9E8FF" },
			{ x: 1020, y: 770, w: 430, h: 60, label: "Restraints", localAction: "restraints", color: "#D9E8FF" },
			{ x: 1510, y: 770, w: 330, h: 60, label: "Back", localAction: "main" },
		];
	}

	function getRemoteTrainingButtons() {
		const training = remotePanel.training || {};
		return [
			{ x: 500, y: 280, w: 430, h: 65, label: "Start Training", command: "training start", color: "Pink" },
			{ x: 500, y: 365, w: 430, h: 65, label: "End Training", command: "training end" },
			{ x: 500, y: 450, w: 430, h: 65, label: trainingFlagLabel("Kneel Lock", training.forceKneel), command: "training kneel toggle", color: trainingFlagColor(training.forceKneel) },
			{ x: 500, y: 535, w: 430, h: 65, label: trainingFlagLabel("UltraBC Lock", training.lockUltraBc), command: "training ubc toggle", color: trainingFlagColor(training.lockUltraBc) },
			{ x: 500, y: 620, w: 430, h: 65, label: trainingFlagLabel("Wardrobe Lock", training.lockWardrobe), command: "training wardrobe toggle", color: trainingFlagColor(training.lockWardrobe) },
			{ x: 500, y: 705, w: 430, h: 65, label: trainingFlagLabel("Start Message", training.announceStart), command: "training announce toggle", color: trainingFlagColor(training.announceStart) },
			{ x: 1020, y: 280, w: 430, h: 65, label: `Honorific: ${getHonorificDisplay(training.honorific)}`, command: "training honorific cycle", color: training.honorific && training.honorific !== "off" ? "Pink" : "White" },
			{ x: 1020, y: 365, w: 430, h: 65, label: "Posture Check", command: "training posture", color: "#D9E8FF" },
			{ x: 1020, y: 450, w: 430, h: 65, label: "Task: Kneel", command: "task action kneel", color: "#D9E8FF" },
			{ x: 1020, y: 535, w: 430, h: 65, label: "Task: Stand", command: "task action stand", color: "#D9E8FF" },
			{ x: 1020, y: 620, w: 430, h: 65, label: "Task: Present", command: "task action present", color: "#D9E8FF" },
			{ x: 1020, y: 705, w: 430, h: 65, label: training.strikeAlertsEnabled === false ? "System Scold: Off" : `Scold After: ${training.strikeThreshold || 3}`, prompt: "System scolds after how many strikes?", build: (value) => `training strikes limit ${value || 3}` },
			{ x: 1510, y: 280, w: 330, h: 65, label: "Attention", command: "training attention", color: "#D9E8FF" },
			{ x: 1510, y: 365, w: 330, h: 65, label: "Praise", command: "training praise", color: "#D9E8FF" },
			{ x: 1510, y: 450, w: 330, h: 65, label: "Scold", command: "training scold", color: "Pink" },
			{ x: 1510, y: 535, w: 330, h: 65, label: "View Tasks", command: "task list", color: "#D9E8FF" },
			{ x: 1510, y: 620, w: 330, h: 65, label: "Clear Tasks", command: "task clear" },
			{ x: 1510, y: 705, w: 330, h: 65, label: "Back", localAction: "main" },
		];
	}

	function getRemoteRpArousalButtons() {
		const rp = remotePanel.rpArousal || {};
		return [
			{ x: 500, y: 280, w: 430, h: 65, label: "Request RP Status", command: "rp status", color: "#D9E8FF" },
			{ x: 500, y: 365, w: 430, h: 65, label: `Mode: ${getRpArousalModeDisplay(rp.mode || "cycle")}`, command: "rp mode cycle", color: rp.mode === "off" ? "White" : "#D9E8FF" },
			{ x: 500, y: 450, w: 430, h: 65, label: `Target: ${capitalize(rp.targetStrength || "cycle")}`, command: "rp target cycle" },
			{ x: 500, y: 535, w: 430, h: 65, label: `Performer: ${capitalize(rp.performerStrength || "cycle")}`, command: "rp performer cycle" },
			{ x: 500, y: 620, w: 430, h: 65, label: "US Output: Silent", color: "#F6F6F6", tooltip: "Ultimate Sub debug output stays hidden" },
			{ x: 500, y: 705, w: 430, h: 65, label: "Back", localAction: "main" },
		];
	}

	function getRemoteRestraintButtons() {
		const presets = remotePanel.restraints && Array.isArray(remotePanel.restraints.presets) ? remotePanel.restraints.presets : [];
		const applyButtons = presets.slice(0, 6).map((preset, index) => ({
			x: index < 3 ? 500 : 1020,
			y: 280 + (index % 3) * 85,
			w: 430,
			h: 65,
			label: `Apply ${index + 1}: ${fitText(preset.label || "Preset", 18)}`,
			command: `restraint apply ${index + 1}`,
			color: "Pink",
		}));
		return [
			...applyButtons,
			{ x: 500, y: 550, w: 430, h: 65, label: "Save Worn Slot", prompt: "Group and label, like ItemMouth|Training Gag", build: (value) => value ? `restraint save ${value}` : "" },
			{ x: 500, y: 635, w: 430, h: 65, label: "Add Regular Item", prompt: "Group|Asset|Label, like ItemMouth|BallGag|Basic Gag", build: (value) => value ? `restraint add ${value}` : "" },
			{ x: 500, y: 720, w: 430, h: 65, label: "Remove Slot", prompt: "Group to remove, like ItemMouth", build: (value) => value ? `restraint remove ${value}` : "" },
			{ x: 1020, y: 550, w: 430, h: 65, label: "List Presets", command: "restraint list", color: "#D9E8FF" },
			{ x: 1020, y: 635, w: 430, h: 65, label: "Delete Preset #", prompt: "Preset number to delete?", build: (value) => `restraint delete ${value || 1}` },
			{ x: 1020, y: 720, w: 430, h: 65, label: "Clear Presets", command: "restraint clear" },
			{ x: 1510, y: 720, w: 330, h: 65, label: "Back", localAction: "main" },
		];
	}

	function trainingFlagLabel(label, value) {
		if (value === true) return `${label}: On`;
		if (value === false) return `${label}: Off`;
		return `${label} Toggle`;
	}

	function trainingFlagColor(value) {
		if (value === true) return "Pink";
		if (value === false) return "White";
		return "#F6F6F6";
	}

	function drawRemoteTrainingDashboard() {
		const training = remotePanel.training || {};
		const activeLabel = training.active === true ? "Active" : training.active === false ? "Inactive" : "Unknown";
		const taskText = remotePanel.currentTaskText || (remotePanel.openTaskCount ? `${remotePanel.openTaskCount} open task${remotePanel.openTaskCount === 1 ? "" : "s"}` : "None seen");
		const locks = [
			training.forceKneel ? "kneel" : "",
			training.lockUltraBc || remotePanel.ultraBcEscapeToolsLocked ? "UltraBC" : "",
			training.lockWardrobe || remotePanel.wardrobeCommandLocked ? "wardrobe" : "",
		].filter(Boolean).join(", ") || "none";
		const lastTraining = remotePanel.lastTrainingEvent || "No Training event seen yet.";

		DrawText("Training Dashboard", 1080, 255, "Black", "Gray");
		drawDashboardTile(500, 300, 410, 90, "Training", activeLabel, training.active ? "Pink" : "#F6F6F6");
		drawDashboardTile(940, 300, 410, 90, "Current Task", taskText, "#F6F6F6");
		drawDashboardTile(1380, 300, 410, 90, "Strikes", String(Number(training.honorificStrikes) || 0), training.honorificStrikes ? "Pink" : "#F6F6F6");
		drawDashboardTile(500, 415, 410, 90, "Honorific", getHonorificDisplay(training.honorific), training.honorific && training.honorific !== "off" ? "Pink" : "#F6F6F6");
		drawDashboardTile(940, 415, 410, 90, "Locks", locks, locks === "none" ? "#F6F6F6" : "Pink");
		drawDashboardTile(1380, 415, 410, 90, "Open Tasks", remotePanel.openTaskCount == null ? "Unknown" : String(remotePanel.openTaskCount), remotePanel.openTaskCount ? "#D9E8FF" : "#F6F6F6");
		drawDashboardTile(500, 530, 410, 90, "System Scold", training.strikeAlertsEnabled === false ? "Off" : `After ${training.strikeThreshold || 3}`, training.strikeAlertsEnabled === false ? "#F6F6F6" : "#D9E8FF");
		drawDashboardTile(940, 530, 410, 90, "Restraints", remotePanel.savedRestraintCount == null ? "Unknown" : `${remotePanel.savedRestraintCount} saved`, "#F6F6F6");
		drawDashboardTile(1380, 530, 410, 90, "Start Message", training.announceStart ? "On" : "Off", training.announceStart ? "#D9E8FF" : "#F6F6F6");

		drawLabelLines([
			`Last Training note: ${lastTraining}`,
			"The white heel marker appears beside this sub in-room while Training is active.",
		], 1145, 855, 38);
	}

	function drawDashboardTile(x, y, w, h, label, value, color) {
		DrawButton(x, y, w, h, "", color || "#F6F6F6", "", label);
		DrawText(label, x + w / 2, y + 28, "Black", "Gray");
		DrawText(fitText(value, 28), x + w / 2, y + 66, "Black", "Gray");
	}

	function drawRemoteTrainingNotes() {
		const training = remotePanel.training;
		const statusLine = training
			? `Training: ${training.active ? "active" : "inactive"}; honorific ${getHonorificDisplay(training.honorific)}; strikes ${Number(training.honorificStrikes) || 0}`
			: "Training status unknown. Request status or press a Training button.";
		drawLabelLines([
			statusLine,
			"Start Training applies the toggles on the target account.",
			"Honorific checks require Miss or Sir somewhere in normal speech before gag muffling.",
			"Action tasks lock chat and profile clicks until the current task is completed.",
		], 545, 820, 38);
	}

	function drawRemoteRpArousalNotes() {
		const rp = remotePanel.rpArousal;
		const statusLine = rp
			? `RP: ${getRpArousalModeDisplay(rp.mode)}; target ${rp.targetStrength || "unknown"}; performer ${rp.performerStrength || "unknown"}; silent`
			: "RP status unknown. Request status or press a button.";
		drawLabelLines([
			statusLine,
			"RP Arousal reacts to room emotes sent by the loaded character.",
			"Targets can be normal BC clients; BC activity permissions still apply.",
			"Owned Pair limits targets to owner/sub pairs; Everyone accepts the whole room.",
		], 545, 820, 38);
	}

	function drawRemoteRestraintNotes() {
		const presets = remotePanel.restraints && Array.isArray(remotePanel.restraints.presets) ? remotePanel.restraints.presets : [];
		const presetLine = presets.length
			? `Saved punishment presets: ${presets.length}.`
			: "No known saved punishment presets yet. Click List Presets or save a worn slot.";
		drawLabelLines([
			presetLine,
			"Save Worn Slot preserves the sub's currently worn item, including crafted data.",
			"Add Regular Item stores a normal BC asset by group and asset name.",
			"Apply buttons affect this specific sub's loaded Ultimate Sub account.",
		], 545, 820, 38);
	}

	function getRemoteWardrobeToggleButton() {
		if (remotePanel.wardrobeCommandLocked === true) {
			return {
				x: 1510,
				y: 620,
				w: 330,
				h: 65,
				label: "Wardrobe: Locked",
				command: "wardrobe toggle",
				color: "Pink",
				tooltip: "Toggle /wardrobe and /wrobe access",
			};
		}

		if (remotePanel.wardrobeCommandLocked === false) {
			return {
				x: 1510,
				y: 620,
				w: 330,
				h: 65,
				label: "Wardrobe: Allowed",
				command: "wardrobe toggle",
				color: "#D9E8FF",
				tooltip: "Toggle /wardrobe and /wrobe access",
			};
		}

		return {
			x: 1510,
			y: 620,
			w: 330,
			h: 65,
			label: "Wardrobe Toggle",
			command: "wardrobe toggle",
			color: "White",
			tooltip: "Toggle /wardrobe and /wrobe access",
		};
	}

	function handleRemoteOwnerPanelClick() {
		if (MouseIn(1815, 75, 90, 90)) {
			closeRemoteOwnerPanel();
			return;
		}

		for (const button of getActiveRemotePanelButtons()) {
			if (!MouseIn(button.x, button.y, button.w, button.h)) continue;
			if (button.localAction === "training") {
				remotePanel.view = "training";
				remotePanel.message = "Training controls opened.";
				sendRemoteOwnerCommand("status", "Request Status");
				return;
			}
			if (button.localAction === "trainingDashboard") {
				remotePanel.view = "trainingDashboard";
				remotePanel.message = "Training dashboard opened.";
				sendRemoteOwnerCommand("status", "Request Status");
				return;
			}
			if (button.localAction === "rp") {
				remotePanel.view = "rp";
				remotePanel.message = "RP Arousal controls opened.";
				sendRemoteOwnerCommand("rp status", "Request RP Status");
				return;
			}
			if (button.localAction === "restraints") {
				remotePanel.view = "restraints";
				remotePanel.message = "Restraint presets opened.";
				sendRemoteOwnerCommand("restraint list", "List Presets");
				return;
			}
			if (button.localAction === "main") {
				remotePanel.view = "main";
				remotePanel.message = "Owner panel opened.";
				return;
			}
			let command = button.command;
			if (!command && button.prompt && typeof prompt === "function") {
				const value = prompt(button.prompt, "");
				command = button.build ? button.build(value || "") : "";
			}
			if (command) sendRemoteOwnerCommand(command, button.label);
			return;
		}
	}

	function sendRemoteOwnerCommand(command, label) {
		const target = remotePanel.target;
		if (!target) return;

		if (!isPlayerInChatRoom() || typeof ServerSend !== "function") {
			remotePanel.message = "Join the same chat room as the target, then press the button again.";
			return;
		}

		try {
			const localResult = performOwnerSideBcAction(command, target.character);
			ServerSend("ChatRoomChat", {
				Content: "UltimateSubCommand",
				Type: "Hidden",
				Target: target.memberNumber,
				Dictionary: [
					{ Tag: "UltimateSubCommand", Text: command },
				],
			});
			remotePanel.message = `${localResult ? `${localResult} ` : ""}Sent ${label || command}; waiting for ${target.name}.`;
			remotePanel.pendingAt = Date.now();
			remotePanel.pendingLabel = label || command;
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not send remote owner command`, error);
			remotePanel.message = "Could not send the owner command.";
		}
	}

	function captureRemoteResponse(data) {
		if (!remotePanel.active || !remotePanel.target || !data) return false;
		if (Number(data.Sender) !== remotePanel.target.memberNumber) return false;

		if (data.Type === "Hidden" && data.Content === "UltimateSubResponse") {
			const hiddenMessage = getDictionaryText(data, "UltimateSubMessage");
			if (hiddenMessage) {
				updateRemoteKnownState(hiddenMessage);
				remotePanel.message = hiddenMessage.replace(/^\[Ultimate Sub\]\s*/i, "");
				remotePanel.pendingAt = 0;
				remotePanel.pendingLabel = "";
				return true;
			}
		}

		if (data.Type !== "Whisper") return false;
		const content = typeof data.Content === "string" ? data.Content : "";
		if (!content.includes("[Ultimate Sub]")) return false;
		updateRemoteKnownState(content);
		remotePanel.message = content.replace(/^\[Ultimate Sub\]\s*/i, "");
		remotePanel.pendingAt = 0;
		remotePanel.pendingLabel = "";
		return false;
	}

	function ignoreLegacyStrikeAlert(data) {
		return Boolean(data && data.Type === "Hidden" && data.Content === "UltimateSubStrikeAlert");
	}

	function captureTrainingPresence(data) {
		if (!data || data.Type !== "Hidden" || data.Content !== TRAINING_PRESENCE_CONTENT) return false;
		const memberNumber = Number(data.Sender);
		if (!memberNumber) return true;
		const active = getDictionaryText(data, "UltimateSubTrainingActive") === "1";
		trainingPresence[memberNumber] = {
			active,
			updatedAt: Date.now(),
			honorific: normalizeHonorific(getDictionaryText(data, "UltimateSubTrainingHonorific")) || "off",
			strikes: Number(getDictionaryText(data, "UltimateSubTrainingStrikes")) || 0,
		};
		return true;
	}

	function captureStrikePopupResponse(data) {
		if (!strikePopup.active || !strikePopup.target || !data) return false;
		if (Number(data.Sender) !== strikePopup.target.memberNumber) return false;

		if (data.Type === "Hidden" && data.Content === "UltimateSubResponse") {
			const hiddenMessage = getDictionaryText(data, "UltimateSubMessage");
			if (hiddenMessage) {
				updateStrikePopupKnownState(hiddenMessage);
				strikePopup.message = hiddenMessage.replace(/^\[Ultimate Sub\]\s*/i, "");
				strikePopup.pendingAt = 0;
				strikePopup.pendingLabel = "";
				return true;
			}
		}

		return false;
	}

	function captureStrikeAlert(data) {
		if (!data || data.Type !== "Hidden" || data.Content !== "UltimateSubStrikeAlert") return false;
		if (data.Target && Number(data.Target) !== (Player && Player.MemberNumber)) return true;

		const sender = Number(data.Sender);
		if (!sender) return true;
		const character = getRoomCharacter(sender);
		if (character && !isTargetOwnedByPlayer(character)) return true;

		const fallbackName = getDictionaryText(data, "UltimateSubSubName") || `#${sender}`;
		strikePopup = {
			active: true,
			target: {
				character,
				memberNumber: sender,
				name: character ? getCharacterDisplayName(character) || fallbackName : fallbackName,
			},
			strikes: Number(getDictionaryText(data, "UltimateSubStrikes")) || 0,
			reason: getDictionaryText(data, "UltimateSubReason") || "Training rule broken.",
			presets: parseStrikeAlertPresets(data),
			message: "Strike threshold reached. Choose a response.",
			pendingAt: 0,
			pendingLabel: "",
		};
		return true;
	}

	function parseStrikeAlertPresets(data) {
		const presets = [];
		for (let index = 1; index <= STRIKE_POPUP_PRESET_BUTTONS; index += 1) {
			const label = getDictionaryText(data, `UltimateSubPreset${index}`);
			if (label) presets.push({ index, label: fitText(label, 34) });
		}
		return presets;
	}

	function drawStrikePopup() {
		if (!strikePopup.active || !strikePopup.target) return;
		updateStrikePopupPendingMessage();

		if (typeof MainCanvas !== "undefined" && MainCanvas) {
			MainCanvas.save();
			MainCanvas.fillStyle = "rgba(255, 255, 255, 0.96)";
			MainCanvas.strokeStyle = "Black";
			MainCanvas.lineWidth = 4;
			MainCanvas.fillRect(60, 95, 900, 800);
			MainCanvas.strokeRect(60, 95, 900, 800);
			MainCanvas.restore();
		}

		DrawText("Ultimate Sub Strike Response", 510, 150, "Black", "Gray");
		DrawText(`${strikePopup.target.name} (#${strikePopup.target.memberNumber})`, 510, 205, "Black", "Gray");
		DrawText(`Training strikes: ${strikePopup.strikes}`, 510, 260, "Black", "Gray");
		drawLabelLines([fitText(strikePopup.reason, 56)], 510, 315, 38);
		DrawButton(875, 115, 65, 65, "X", "White", "", "Dismiss strike popup");

		getStrikePopupButtons().forEach((button) => {
			DrawButton(button.x, button.y, button.w, button.h, button.label, button.color || "White", "", button.tooltip || button.label);
		});

		if (strikePopup.message) {
			DrawText(fitText(strikePopup.message, 54), 510, 850, "Black", "Gray");
		}
	}

	function getStrikePopupButtons() {
		const presets = strikePopup.presets || [];
		const buttons = [
			{ x: 105, y: 380, w: 380, h: 58, label: "Scold + Kneel", command: "punish scoldkneel", color: "Pink" },
			{ x: 535, y: 380, w: 380, h: 58, label: "Lock Wardrobe", command: "wardrobe lock", color: "Pink" },
			{ x: 105, y: 455, w: 380, h: 58, label: "Lock UltraBC", command: "ubc lock", color: "Pink" },
			{ x: 535, y: 455, w: 380, h: 58, label: "Apology Task", command: "punish apology", color: "#D9E8FF" },
			{ x: 105, y: 530, w: 380, h: 58, label: "Clear Strikes", command: "training strikes clear" },
			{ x: 535, y: 530, w: 380, h: 58, label: "List Presets", command: "restraint list", color: "#D9E8FF" },
		];

		for (let index = 0; index < STRIKE_POPUP_PRESET_BUTTONS; index += 1) {
			const preset = presets[index];
			buttons.push({
				x: index === 1 ? 535 : 105,
				y: index < 2 ? 605 : 680,
				w: 380,
				h: 58,
				label: preset ? `Apply ${index + 1}: ${fitText(preset.label, 18)}` : `Preset ${index + 1}: Empty`,
				command: preset ? `restraint apply ${index + 1}` : "",
				color: preset ? "Pink" : "#DDDDDD",
				disabled: !preset,
				tooltip: preset ? `Apply saved restraint preset ${index + 1}` : "Save a restraint preset from the target owner panel first",
			});
		}
		buttons.push({ x: 535, y: 680, w: 380, h: 58, label: "Dismiss", localAction: "dismiss" });
		return buttons;
	}

	function handleStrikePopupClick() {
		if (!strikePopup.active) return false;
		if (MouseIn(875, 115, 65, 65)) {
			closeStrikePopup();
			return true;
		}
		for (const button of getStrikePopupButtons()) {
			if (!MouseIn(button.x, button.y, button.w, button.h)) continue;
			if (button.localAction === "dismiss") {
				closeStrikePopup();
				return true;
			}
			if (button.disabled) {
				strikePopup.message = button.tooltip || "That action is not ready yet.";
				return true;
			}
			if (button.command) sendStrikePopupCommand(button.command, button.label);
			return true;
		}
		return true;
	}

	function sendStrikePopupCommand(command, label) {
		const target = strikePopup.target;
		if (!target) return;

		if (!isPlayerInChatRoom() || typeof ServerSend !== "function") {
			strikePopup.message = "Join the same chat room as the sub, then press the button again.";
			return;
		}

		try {
			const localResult = performOwnerSideBcAction(command, target.character);
			ServerSend("ChatRoomChat", {
				Content: "UltimateSubCommand",
				Type: "Hidden",
				Target: target.memberNumber,
				Dictionary: [
					{ Tag: "UltimateSubCommand", Text: command },
				],
			});
			strikePopup.message = `${localResult ? `${localResult} ` : ""}Sent ${label || command}; waiting for ${target.name}.`;
			strikePopup.pendingAt = Date.now();
			strikePopup.pendingLabel = label || command;
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not send strike popup command`, error);
			strikePopup.message = "Could not send the owner command.";
		}
	}

	function updateStrikePopupPendingMessage() {
		if (!strikePopup.pendingAt || Date.now() - strikePopup.pendingAt < 4500) return;
		const targetName = strikePopup.target ? strikePopup.target.name : "the sub";
		strikePopup.message = `No response from ${targetName}. Load Ultimate Sub on that account, then try ${strikePopup.pendingLabel || "again"}.`;
		strikePopup.pendingAt = 0;
		strikePopup.pendingLabel = "";
	}

	function updateStrikePopupKnownState(message) {
		const text = String(message || "");
		if (!text.toLowerCase().includes("restraints:")) return;
		const presets = [];
		const pattern = /#(\d+)\s+([^;]+)/g;
		let match = null;
		while ((match = pattern.exec(text))) {
			presets.push({
				index: Number(match[1]) || presets.length + 1,
				label: fitText(match[2].trim(), 34),
			});
		}
		strikePopup.presets = presets.slice(0, STRIKE_POPUP_PRESET_BUTTONS);
	}

	function closeStrikePopup() {
		strikePopup.active = false;
		strikePopup.message = "";
		strikePopup.pendingAt = 0;
		strikePopup.pendingLabel = "";
	}

	function updateRemoteKnownState(message) {
		const lower = String(message || "").toLowerCase();
		if (lower.includes("ultrabc locked") || lower.includes("ultrabc escape tools are locked") || lower.includes("ultrabc escape tools hard-locked")) {
			remotePanel.ultraBcEscapeToolsLocked = true;
		} else if (lower.includes("ultrabc allowed") || lower.includes("ultrabc escape tools are allowed")) {
			remotePanel.ultraBcEscapeToolsLocked = false;
		}
		if (lower.includes("wardrobe command locked") || lower.includes("wardrobe locked")) {
			remotePanel.wardrobeCommandLocked = true;
		} else if (
			lower.includes("wardrobe command allowed")
			|| lower.includes("wardrobe allowed")
			|| lower.includes("wardrobe token allowed")
		) {
			remotePanel.wardrobeCommandLocked = false;
		}
		updateRemoteTrainingState(lower, message);
		updateRemoteTaskState(message);
		updateRemoteRpArousalState(lower);
		updateRemoteRestraintState(message);
	}

	function updateRemoteTrainingState(lower, originalMessage) {
		if (!lower.includes("training:")) return;
		const training = remotePanel.training || {};
		if (lower.includes("training: active")) training.active = true;
		if (lower.includes("training: inactive")) training.active = false;
		if (lower.includes("kneel lock on")) training.forceKneel = true;
		if (lower.includes("kneel lock off")) training.forceKneel = false;
		if (lower.includes("ultrabc lock on")) training.lockUltraBc = true;
		if (lower.includes("ultrabc lock off")) training.lockUltraBc = false;
		if (lower.includes("wardrobe lock on")) training.lockWardrobe = true;
		if (lower.includes("wardrobe lock off")) training.lockWardrobe = false;
		if (lower.includes("start message on")) training.announceStart = true;
		if (lower.includes("start message off")) training.announceStart = false;
		if (lower.includes("honorific miss")) training.honorific = "miss";
		else if (lower.includes("honorific sir")) training.honorific = "sir";
		else if (lower.includes("honorific off")) training.honorific = "off";
		const strikesMatch = lower.match(/strikes?\s+(\d+)/);
		if (strikesMatch) training.honorificStrikes = Number(strikesMatch[1]) || 0;
		const thresholdMatch = lower.match(/(?:system scold|scold|popup)(?:\s+(?:on|off))?\s+after\s+(\d+)/);
		if (thresholdMatch) training.strikeThreshold = Number(thresholdMatch[1]) || 3;
		if (lower.includes("system scold on")) training.strikeAlertsEnabled = true;
		else if (lower.includes("system scold off")) training.strikeAlertsEnabled = false;
		remotePanel.training = training;
		remotePanel.lastTrainingEvent = fitText(String(originalMessage || "").replace(/^\[Ultimate Sub\]\s*/i, ""), 88);
	}

	function updateRemoteTaskState(message) {
		const text = String(message || "");
		const lower = text.toLowerCase();
		const openTasksMatch = lower.match(/(\d+)\s+open tasks?/);
		if (openTasksMatch) remotePanel.openTaskCount = Number(openTasksMatch[1]) || 0;
		if (lower.includes("no open tasks")) {
			remotePanel.openTaskCount = 0;
			remotePanel.currentTaskText = "";
			return;
		}
		if (!lower.includes("open tasks")) return;
		const currentMatch = text.match(/\[Current\]\s*([^|]+)/i);
		if (currentMatch) {
			remotePanel.currentTaskText = fitText(currentMatch[1].trim(), 42);
		} else if (remotePanel.openTaskCount === 0) {
			remotePanel.currentTaskText = "";
		}
	}

	function updateRemoteRpArousalState(lower) {
		if (!lower.includes("rp arousal:")) return;
		const rp = remotePanel.rpArousal || {};
		if (lower.includes("rp arousal: off")) rp.mode = "off";
		else if (lower.includes("rp arousal: owned pair")) rp.mode = "ownedPair";
		else if (lower.includes("rp arousal: everyone")) rp.mode = "everyone";
		if (lower.includes("target light")) rp.targetStrength = "light";
		else if (lower.includes("target normal")) rp.targetStrength = "normal";
		else if (lower.includes("target strong")) rp.targetStrength = "strong";
		if (lower.includes("performer off")) rp.performerStrength = "off";
		else if (lower.includes("performer low")) rp.performerStrength = "low";
		else if (lower.includes("performer normal")) rp.performerStrength = "normal";
		if (lower.includes("feedback on")) rp.feedback = true;
		else if (lower.includes("feedback off")) rp.feedback = false;
		remotePanel.rpArousal = rp;
	}

	function updateRemoteRestraintState(message) {
		const text = String(message || "");
		const lower = text.toLowerCase();
		if (!lower.includes("restraints:")) return;
		const presets = [];
		const pattern = /#(\d+)\s+([^;]+)/g;
		let match = null;
		while ((match = pattern.exec(text))) {
			presets.push({
				index: Number(match[1]) || presets.length + 1,
				label: fitText(match[2].trim(), 34),
			});
		}
		remotePanel.savedRestraintCount = presets.length;
		remotePanel.restraints = { presets };
	}

	function updateRemotePendingMessage() {
		if (!remotePanel.pendingAt || Date.now() - remotePanel.pendingAt < 4500) return;
		const targetName = remotePanel.target ? remotePanel.target.name : "target";
		remotePanel.message = `No response from ${targetName}. Load Ultimate Sub on that account, then try ${remotePanel.pendingLabel || "again"}.`;
		remotePanel.pendingAt = 0;
		remotePanel.pendingLabel = "";
	}

	function performOwnerSideBcAction(command, targetCharacter) {
		const normalized = String(command || "").trim().toLowerCase();
		if (!targetCharacter) return "";

		if (
			normalized === "scene public"
			|| normalized === "training posture"
			|| normalized === "punish scoldkneel"
		) {
			return setCharacterKneeling(targetCharacter, true);
		}

		if (normalized === "scene aftercare" || normalized === "training end") {
			return setCharacterKneeling(targetCharacter, false);
		}

		return "";
	}

	function setCharacterKneeling(character, kneel) {
		if (!character || typeof PoseSetActive !== "function") return "";
		if (!isPlayerInChatRoom()) return "";

		const alreadyKneeling = character.IsKneeling && character.IsKneeling();
		if (alreadyKneeling === kneel) return kneel ? "Target is already kneeling." : "Target is already standing.";

		try {
			if (typeof ServerSend === "function" && typeof DictionaryBuilder !== "undefined" && Player) {
				const dictionary = new DictionaryBuilder()
					.sourceCharacter(Player)
					.targetCharacter(character)
					.build();
				ServerSend("ChatRoomChat", {
					Content: kneel ? "HelpKneelDown" : "HelpStandUp",
					Type: "Action",
					Dictionary: dictionary,
				});
			}
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not publish pose action`, error);
		}

		try {
			PoseSetActive(character, kneel ? "Kneel" : "BaseLower", false);
			if (typeof ChatRoomCharacterUpdate === "function") {
				ChatRoomCharacterUpdate(character);
			}
			return kneel ? "Target pose set to kneel." : "Target pose set to stand.";
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not set target pose`, error);
			return "Could not change target pose.";
		}
	}

	function drawUltimateSubIcon(x, y, disabled) {
		if (typeof MainCanvas === "undefined" || !MainCanvas) return;

		MainCanvas.save();
		MainCanvas.textAlign = "center";
		MainCanvas.lineWidth = 6;
		MainCanvas.strokeStyle = disabled ? "#777777" : "Black";
		MainCanvas.fillStyle = disabled ? "#777777" : "Black";

		MainCanvas.beginPath();
		MainCanvas.arc(x + 45, y + 48, 28, Math.PI * 0.15, Math.PI * 0.85, false);
		MainCanvas.stroke();
		MainCanvas.beginPath();
		MainCanvas.moveTo(x + 17, y + 48);
		MainCanvas.lineTo(x + 73, y + 48);
		MainCanvas.stroke();

		drawHeart(x + 45, y + 61, 10, disabled ? "#999999" : "#C2185B");
		DrawText("US", x + 45, y + 29, disabled ? "#777777" : "Black", "Gray");
		MainCanvas.restore();
	}

	function drawHeart(cx, cy, size, color) {
		MainCanvas.save();
		MainCanvas.fillStyle = color;
		MainCanvas.beginPath();
		MainCanvas.moveTo(cx, cy + size * 0.8);
		MainCanvas.bezierCurveTo(cx - size * 1.5, cy - size * 0.2, cx - size * 0.8, cy - size * 1.2, cx, cy - size * 0.45);
		MainCanvas.bezierCurveTo(cx + size * 0.8, cy - size * 1.2, cx + size * 1.5, cy - size * 0.2, cx, cy + size * 0.8);
		MainCanvas.fill();
		MainCanvas.restore();
	}

	function drawTrainingStatusHeel(character, x, y, zoom) {
		if (!shouldDrawTrainingHeel(character)) return;
		if (typeof MainCanvas === "undefined" || !MainCanvas) return;
		const safeZoom = Number(zoom) || 1;
		const cx = Number(x || 0) + 106 * safeZoom;
		const cy = Number(y || 0) + 640 * safeZoom;
		const size = Math.max(18, 32 * safeZoom);
		drawHighHeelIcon(cx, cy, size);
	}

	function shouldDrawTrainingHeel(character) {
		if (!character || !character.MemberNumber) return false;
		if (typeof CurrentScreen !== "undefined" && CurrentScreen !== "ChatRoom") return false;
		if (typeof ChatRoomCharacter !== "undefined" && Array.isArray(ChatRoomCharacter) && !ChatRoomCharacter.includes(character)) return false;
		const memberNumber = Number(character.MemberNumber);
		if (Player && memberNumber === Player.MemberNumber) return isTrainingSceneActive();
		const presence = trainingPresence[memberNumber];
		if (!presence || !presence.active) return false;
		if (Date.now() - presence.updatedAt > TRAINING_PRESENCE_TTL) {
			delete trainingPresence[memberNumber];
			return false;
		}
		return true;
	}

	function drawHighHeelIcon(cx, cy, size) {
		MainCanvas.save();
		MainCanvas.lineJoin = "round";
		MainCanvas.lineCap = "round";

		const drawShape = (stroke, width) => {
			MainCanvas.strokeStyle = stroke;
			MainCanvas.lineWidth = width;
			MainCanvas.beginPath();
			MainCanvas.moveTo(cx - size * 0.46, cy + size * 0.18);
			MainCanvas.lineTo(cx - size * 0.08, cy + size * 0.18);
			MainCanvas.quadraticCurveTo(cx + size * 0.18, cy + size * 0.12, cx + size * 0.42, cy - size * 0.04);
			MainCanvas.lineTo(cx + size * 0.2, cy - size * 0.14);
			MainCanvas.quadraticCurveTo(cx - size * 0.06, cy - size * 0.02, cx - size * 0.28, cy + size * 0.12);
			MainCanvas.stroke();

			MainCanvas.beginPath();
			MainCanvas.moveTo(cx - size * 0.06, cy + size * 0.18);
			MainCanvas.lineTo(cx + size * 0.02, cy + size * 0.48);
			MainCanvas.stroke();

			MainCanvas.beginPath();
			MainCanvas.moveTo(cx - size * 0.04, cy + size * 0.48);
			MainCanvas.lineTo(cx + size * 0.1, cy + size * 0.48);
			MainCanvas.stroke();

			MainCanvas.beginPath();
			MainCanvas.moveTo(cx + size * 0.2, cy - size * 0.14);
			MainCanvas.lineTo(cx + size * 0.28, cy - size * 0.32);
			MainCanvas.stroke();
		};

		drawShape("rgba(0, 0, 0, 0.75)", Math.max(3, size * 0.16));
		drawShape("White", Math.max(2, size * 0.1));
		MainCanvas.restore();
	}

	function closeUltimateSubMenu() {
		uiState.message = "";
		if (typeof PreferenceSubscreenExit === "function") {
			PreferenceSubscreenExit();
			return;
		}

		if (typeof PreferenceSubscreenExtensionsClear === "function") {
			PreferenceSubscreenExtensionsClear();
		}
	}

	function emergencyReset() {
		settings.enabled = false;
		settings.localEmergencyPaused = true;
		settings.ultraBcEscapeToolsLocked = false;
		settings.ultraBcAutoRelockAt = 0;
		settings.wardrobeCommandLocked = false;
		settings.sceneMode = "none";
		settings.training = { ...defaultTrainingSettings };
		syncUltraBcNoEscape(false);
		addAudit("Emergency reset used.", "Owner commands paused locally; Training, UltraBC, and wardrobe controls reset.");
		saveSettings();
		uiState.message = "Owner commands paused locally. Escape and wardrobe allowed.";
	}

	function getFullOwnerMemberNumber() {
		const ownerNumbers = getOwnershipMemberNumbers(Player);
		return ownerNumbers.length ? ownerNumbers[0] : null;
	}

	function isFullBcOwnerMember(memberNumber) {
		const numericMemberNumber = Number(memberNumber);
		if (!numericMemberNumber) return false;

		if (getOwnershipMemberNumbers(Player).includes(numericMemberNumber)) {
			return true;
		}

		if (Player && typeof Player.IsOwnedByMemberNumber === "function") {
			try {
				if (Player.IsOwnedByMemberNumber(numericMemberNumber)) return true;
			} catch (error) {
				console.warn(`[${MOD_NAME}] Owner helper check failed`, error);
			}
		}

		return getBcxCharacterRole(numericMemberNumber) === "clubowner";
	}

	function getOwnershipMemberNumbers(character) {
		const numbers = new Set();
		if (!character) return [];

		addOwnerNumber(numbers, character.OwnerMemberNumber);
		addOwnerNumber(numbers, character.Owner);
		addOwnerNumber(numbers, character.OwnerNumber);

		if (typeof character.OwnerNumber === "function") {
			try {
				addOwnerNumber(numbers, character.OwnerNumber());
			} catch (error) {
				console.warn(`[${MOD_NAME}] Could not read OwnerNumber()`, error);
			}
		}

		const ownership = character.Ownership;
		if (ownership) {
			addOwnerNumber(numbers, ownership.MemberNumber);
			addOwnerNumber(numbers, ownership.OwnerMemberNumber);
			addOwnerNumber(numbers, ownership.Number);
			addOwnerNumber(numbers, ownership.ID);
			addOwnerNumber(numbers, ownership.MemberID);
		}

		return Array.from(numbers);
	}

	function addOwnerNumber(numbers, value) {
		if (typeof value === "function") return;
		const numericValue = Number(value);
		if (Number.isFinite(numericValue) && numericValue > 0) {
			numbers.add(numericValue);
		}
	}

	function getBcxCharacterRole(memberNumber) {
		try {
			const api = getBcxApi();
			if (api && typeof api.getCharacterRole === "function") {
				return api.getCharacterRole(Number(memberNumber)) || "";
			}
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not read BCX role`, error);
		}
		return "";
	}

	function getOwnerCheckDebug(memberNumber) {
		const numericMemberNumber = Number(memberNumber);
		const ownerNumbers = getOwnershipMemberNumbers(Player);
		let fullyOwned = "unknown";
		let helperOwned = "unknown";
		let ownerNumber = "unknown";

		try {
			if (Player && typeof Player.IsFullyOwned === "function") fullyOwned = String(Player.IsFullyOwned());
		} catch (error) {
			fullyOwned = "error";
		}

		try {
			if (Player && typeof Player.IsOwnedByMemberNumber === "function") helperOwned = String(Player.IsOwnedByMemberNumber(numericMemberNumber));
		} catch (error) {
			helperOwned = "error";
		}

		try {
			if (Player && typeof Player.OwnerNumber === "function") ownerNumber = String(Player.OwnerNumber());
		} catch (error) {
			ownerNumber = "error";
		}

		const bcxRole = getBcxCharacterRole(numericMemberNumber) || "none";
		const rawOwners = ownerNumbers.length ? ownerNumbers.join(",") : "none";
		return `sender #${numericMemberNumber}; owner fields ${rawOwners}; OwnerNumber() ${ownerNumber}; IsFullyOwned ${fullyOwned}; IsOwnedByMemberNumber ${helperOwned}; BCX role ${bcxRole}`;
	}

	function detectUltraBc() {
		if (Player && Player.UBC) return true;
		if (window.UBC || window.UltraBC || window.ULTRAbc) return true;
		return Boolean(Player && Player.MemberNumber && localStorage.getItem(`bc_moaner__${Player.MemberNumber}`));
	}

	function getBcxStatus(ownerNumber) {
		if (!window.bcx) return "not detected";
		const version = window.bcx.version ? `v${window.bcx.version}` : "detected";
		if (!ownerNumber) return version;

		try {
			const api = getBcxApi();
			const role = api && typeof api.getCharacterRole === "function" ? api.getCharacterRole(ownerNumber) : "";
			return role ? `${version}, owner role: ${role}` : version;
		} catch (error) {
			return version;
		}
	}

	function getBcxApi() {
		if (bcxApi) return bcxApi;
		if (window.bcx && typeof window.bcx.getModApi === "function") {
			bcxApi = window.bcx.getModApi(MOD_ID);
			return bcxApi;
		}
		return null;
	}

	function setUltraBcEscapeToolsLocked(locked, message, actor) {
		settings.ultraBcEscapeToolsLocked = locked;
		settings.ultraBcAutoRelockAt = 0;
		syncUltraBcNoEscape(locked);
		addAudit(locked ? "UltraBC escape tools hard-locked." : "UltraBC escape tools allowed.", message || "", actor);
		saveSettings();
		uiState.message = message || (locked ? "UltraBC escape tools hard-locked." : "UltraBC escape tools allowed.");
	}

	function shouldBlockUltraBcEscapeTools() {
		return settings.enabled && !settings.localEmergencyPaused && settings.ultraBcEscapeToolsLocked;
	}

	function shouldBlockWardrobeCommand() {
		return settings.enabled
			&& !settings.localEmergencyPaused
			&& settings.wardrobeCommandLocked
			&& !hasActiveWardrobeToken();
	}

	function getWardrobeCommandStatusText() {
		if (settings.wardrobeCommandLocked && hasActiveWardrobeToken()) {
			return "Wardrobe command: token allowed";
		}
		return settings.wardrobeCommandLocked
			? "Wardrobe command: locked"
			: "Wardrobe command: allowed";
	}

	function buildTrainingStatusLine() {
		const training = settings.training;
		return `Training: ${settings.sceneMode === "training" ? "active" : "inactive"}; kneel lock ${training.forceKneel ? "on" : "off"}; UltraBC lock ${training.lockUltraBc ? "on" : "off"}; wardrobe lock ${training.lockWardrobe ? "on" : "off"}; honorific ${getHonorificDisplay(training.honorific)}; strikes ${training.honorificStrikes || 0}; system scold ${training.strikeAlertsEnabled ? "on" : "off"} after ${training.strikeThreshold || 3}; start message ${training.announceStart ? "on" : "off"}.`;
	}

	function normalizeHonorific(value) {
		const lower = String(value || "").toLowerCase().replace(/[^a-z]/g, "");
		if (!lower || lower === "off" || lower === "none" || lower === "no") return "off";
		if (lower === "miss" || lower === "yesmiss" || lower === "mistress" || lower === "maam" || lower === "madam") return "miss";
		if (lower === "sir" || lower === "yessir" || lower === "master") return "sir";
		return "";
	}

	function getHonorificDisplay(value) {
		const honorific = normalizeHonorific(value);
		if (honorific === "miss") return "Miss";
		if (honorific === "sir") return "Sir";
		return "Off";
	}

	function nextHonorific(value) {
		const honorific = normalizeHonorific(value);
		if (honorific === "off") return "miss";
		if (honorific === "miss") return "sir";
		return "off";
	}

	function syncUltraBcNoEscape(locked) {
		const updates = { noescape: locked };

		if (locked) {
			updates.sosbuttons = false;
			updates.outbuttons = false;
			updates.hotkeys = false;
			updates.utotal = false;
		} else {
			updates.sosbuttons = true;
			updates.outbuttons = true;
			updates.hotkeys = true;
			updates.utotal = true;
		}

		try {
			if (Player && Player.UBC && Player.UBC.ubcSettings) {
				Object.assign(Player.UBC.ubcSettings, updates);
			}
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not update live UltraBC settings`, error);
		}

		try {
			persistUltraBcSettings(updates);
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not persist UltraBC settings`, error);
		}

		try {
			if (Player && Player.OnlineSharedSettings) {
				const changed = Player.OnlineSharedSettings.Unoescape !== locked;
				Player.OnlineSharedSettings.Unoescape = locked;
				if (changed && typeof ServerAccountUpdate !== "undefined" && ServerAccountUpdate.QueueData) {
					ServerAccountUpdate.QueueData({ OnlineSharedSettings: Player.OnlineSharedSettings });
				}
			}
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not update BC no-escape setting`, error);
		}
	}

	function persistUltraBcSettings(updates) {
		if (!Player || !Player.MemberNumber) return;

		const key = `bc_moaner__${Player.MemberNumber}`;
		let saved = {};
		try {
			saved = JSON.parse(localStorage.getItem(key) || "{}") || {};
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not parse UltraBC settings`, error);
		}
		const nextSaved = { ...saved, ...updates };
		if (JSON.stringify(saved) !== JSON.stringify(nextSaved)) {
			localStorage.setItem(key, JSON.stringify(nextSaved));
		}
	}

	function shouldHardBlockPlayerRelease(target) {
		if (!shouldBlockUltraBcEscapeTools()) return false;
		if (!Player || target !== Player) return false;
		return true;
	}

	function blockUltraBcEscapeOperation(reason) {
		syncUltraBcNoEscape(true);
		const now = Date.now();
		if (now - lastUltraBcBlockNoticeAt > 2500) {
			lastUltraBcBlockNoticeAt = now;
			const message = reason || "Ultimate Sub blocked UltraBC escape tools.";
			const strike = recordTrainingRuleStrike(
				"Tried to use locked UltraBC escape tools.",
				(nextStrike) => `Correction strike ${nextStrike}: wait for owner permission before touching escape tools.`,
				Player && Player.MemberNumber
			);
			uiState.message = message;
			addAudit("UltraBC escape attempt blocked.", `${message}${strike ? ` Strike ${strike}.` : ""}`, Player && Player.MemberNumber);
			saveSettings();
			log(message);
		}
	}

	function blockWardrobeCommand(reason) {
		const now = Date.now();
		if (now - lastWardrobeBlockNoticeAt > 2500) {
			lastWardrobeBlockNoticeAt = now;
			const message = reason || "Blocked wardrobe command.";
			const strike = recordTrainingRuleStrike(
				"Tried to use the locked wardrobe command.",
				(nextStrike) => `Correction strike ${nextStrike}: wait for owner permission before using wardrobe.`,
				Player && Player.MemberNumber
			);
			uiState.message = message;
			publishWardrobeDeniedMessage();
			addAudit("Wardrobe command blocked.", strike ? `Strike ${strike}.` : "", Player && Player.MemberNumber);
			saveSettings();
			log(message);
		}
	}

	function publishWardrobeDeniedMessage() {
		if (!isPlayerInChatRoom() || typeof ServerSend !== "function" || !Player) return;

		const name = getPlayerDisplayName();
		const message = `*The Club snaps the wardrobe shut before ${name} can put on a naughty little display; outfit changes are forbidden by their owner's wishes.`;
		try {
			const dictionary = typeof DictionaryBuilder !== "undefined"
				? new DictionaryBuilder().sourceCharacter(Player).build()
				: undefined;
			const data = {
				Content: message,
				Type: "Emote",
			};
			if (dictionary) data.Dictionary = dictionary;
			ServerSend("ChatRoomChat", data);
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not publish wardrobe denial`, error);
		}
	}

	function getPlayerDisplayName() {
		try {
			if (typeof CharacterNickname === "function" && Player) {
				return CharacterNickname(Player);
			}
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not read player nickname`, error);
		}
		return Player && Player.Name ? Player.Name : "The submissive";
	}

	function publishTrainingRoomMessage(kind) {
		if (!isPlayerInChatRoom() || typeof ServerSend !== "function" || !Player) return;

		const name = getPlayerDisplayName();
		const honorific = getHonorificDisplay(settings.training.honorific);
		const message = getTrainingRoomMessage(kind, name, honorific);
		if (!message) return;

		try {
			const dictionary = typeof DictionaryBuilder !== "undefined"
				? new DictionaryBuilder().sourceCharacter(Player).build()
				: undefined;
			const data = {
				Content: message,
				Type: "Emote",
			};
			if (dictionary) data.Dictionary = dictionary;
			ServerSend("ChatRoomChat", data);
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not publish Training message`, error);
		}
	}

	function broadcastTrainingPresence(force) {
		if (!isPlayerInChatRoom() || typeof ServerSend !== "function" || !Player || !Player.MemberNumber) return;
		const active = isTrainingSceneActive();
		const key = [
			active ? "1" : "0",
			settings.training.honorific || "off",
			settings.training.honorificStrikes || 0,
		].join(":");
		const now = Date.now();
		if (!force && !active) return;
		if (!force && key === lastTrainingPresenceBroadcastKey && now - lastTrainingPresenceBroadcastAt < 15000) return;

		lastTrainingPresenceBroadcastKey = key;
		lastTrainingPresenceBroadcastAt = now;
		trainingPresence[Player.MemberNumber] = {
			active,
			updatedAt: now,
			honorific: settings.training.honorific,
			strikes: settings.training.honorificStrikes || 0,
		};

		try {
			ServerSend("ChatRoomChat", {
				Content: TRAINING_PRESENCE_CONTENT,
				Type: "Hidden",
				Dictionary: [
					{ Tag: "UltimateSubTrainingActive", Text: active ? "1" : "0" },
					{ Tag: "UltimateSubTrainingHonorific", Text: settings.training.honorific || "off" },
					{ Tag: "UltimateSubTrainingStrikes", Text: String(settings.training.honorificStrikes || 0) },
				],
			});
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not broadcast Training presence`, error);
		}
	}

	function pruneTrainingPresence() {
		const now = Date.now();
		Object.keys(trainingPresence).forEach((memberNumber) => {
			if (now - trainingPresence[memberNumber].updatedAt > TRAINING_PRESENCE_TTL) {
				delete trainingPresence[memberNumber];
			}
		});
	}

	function getTrainingRoomMessage(kind, name, honorific) {
		if (kind === "start") {
			const requirements = [];
			if (settings.training.forceKneel) requirements.push("knees down");
			if (settings.training.lockWardrobe) requirements.push("wardrobe sealed");
			if (settings.training.lockUltraBc) requirements.push("escape tools locked away");
			if (settings.training.honorific !== "off") requirements.push(`proper ${honorific} manners`);
			const summary = requirements.length ? requirements.join(", ") : "owner supervision";
			return `*The Club marks ${name} for owner-led training: ${summary}.`;
		}
		if (kind === "end") {
			return `*The Training marker fades from ${name}, leaving their owner to decide what comes next.`;
		}
		if (kind === "honorific") {
			return `*Training protocol tightens around ${name}'s tongue; their owner is to be answered with ${honorific}.`;
		}
		if (kind === "posture") {
			return `*A strict posture check settles over ${name}; those knees belong exactly where the owner wants them.`;
		}
		if (kind === "attention") {
			return `*Training attention snaps into place around ${name}; every bit of focus belongs on their owner.`;
		}
		if (kind === "praise") {
			return `*The Club records ${name}'s obedience with a warm little mark of approval.`;
		}
		if (kind === "scold") {
			return `*The Club gives ${name} a sharp reminder: training means listening, kneeling, and obeying owner protocol.`;
		}
		if (kind === "honorific-block") {
			const strike = settings.training.honorificStrikes || 1;
			return `*Training protocol catches ${name}'s careless words before they reach the room; Strike ${strike} is marked until they remember to include ${honorific}.`;
		}
		return "";
	}

	function publishTrainingTaskRoomMessage(kind, task) {
		if (!isPlayerInChatRoom() || typeof ServerSend !== "function" || !Player || !task) return;

		const name = getPlayerDisplayName();
		const action = TRAINING_ACTION_TASKS[task.action] || null;
		const label = action ? action.label : "Task";
		let message = "";
		if (kind === "assigned") {
			message = `*The Club sets ${name}'s next Training task: ${label}. Nothing else is allowed until it is completed.`;
		} else if (kind === "complete") {
			message = `*Training task complete: ${name} ${action ? action.completeText : "obeys the owner task"}.`;
		} else if (kind === "blocked") {
			message = `*Training protocol catches ${name} trying to drift away; the current task is still ${label}.`;
		}
		if (!message) return;

		try {
			const dictionary = typeof DictionaryBuilder !== "undefined"
				? new DictionaryBuilder().sourceCharacter(Player).build()
				: undefined;
			const data = {
				Content: message,
				Type: "Emote",
			};
			if (dictionary) data.Dictionary = dictionary;
			ServerSend("ChatRoomChat", data);
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not publish Training task message`, error);
		}
	}

	function getCurrentBlockingTrainingTask() {
		if (!isTrainingSceneActive()) return null;
		return settings.tasks.find((task) => (
			task
			&& !task.done
			&& task.blocking === true
			&& task.type === "training-action"
			&& Boolean(TRAINING_ACTION_TASKS[task.action])
		)) || null;
	}

	function createTrainingActionTask(actionKey, sender) {
		const action = normalizeTrainingAction(actionKey);
		if (!action) {
			respondToOwner(sender, "Training action task can be Kneel, Stand, or Present.");
			return;
		}

		if (!isTrainingSceneActive()) {
			respondToOwner(sender, "Start Training before adding an action task.");
			return;
		}

		const actionConfig = TRAINING_ACTION_TASKS[action];
		const task = {
			id: newId("task"),
			text: `Action: ${actionConfig.text}`,
			type: "training-action",
			action,
			blocking: true,
			createdAt: Date.now(),
			createdBy: sender,
			done: false,
			doneAt: 0,
		};
		settings.tasks.push(task);
		settings.tasks = settings.tasks.slice(-12);
		addAudit("Training action task added.", actionConfig.label, sender);
		saveSettings();
		uiState.message = `Training task added: ${actionConfig.label}.`;
		publishTrainingTaskRoomMessage("assigned", task);
		respondToOwner(sender, `Training action task added: ${actionConfig.label}.`);
		setTimeout(() => completeTrainingActionTaskIfSatisfied("already satisfied"), 250);
	}

	function normalizeTrainingAction(value) {
		const lower = String(value || "").toLowerCase().replace(/[^a-z]/g, "");
		if (lower === "kneel" || lower === "kneeling") return "kneel";
		if (lower === "stand" || lower === "standing") return "stand";
		if (lower === "present" || lower === "presents" || lower === "presenting") return "present";
		return "";
	}

	function shouldBlockTrainingActionTaskInput() {
		const task = getCurrentBlockingTrainingTask();
		if (!task) return false;

		const inputChat = typeof document !== "undefined" ? document.getElementById("InputChat") : null;
		if (!inputChat || typeof inputChat.value !== "string") return false;

		const text = inputChat.value.trim();
		if (!text) return false;
		if (isInputCompletingTrainingTask(text, task)) {
			completeTrainingActionTask(task, "completed by typed action");
			return false;
		}
		return true;
	}

	function isInputCompletingTrainingTask(text, task) {
		if (!task || task.action !== "present") return false;
		return textMatchesPresentAction(text);
	}

	function shouldBlockTrainingActionTaskClick() {
		const task = getCurrentBlockingTrainingTask();
		if (!task) return false;
		if (completeTrainingActionTaskIfSatisfied("already satisfied")) return false;
		if (typeof CurrentScreen !== "undefined" && CurrentScreen !== "ChatRoom") return false;
		if (isChatRoomSendButtonClick()) return false;
		if (isChatRoomKneelButtonClick() && isKneelButtonAllowedForTrainingTask(task)) return false;
		return true;
	}

	function isKneelButtonAllowedForTrainingTask(task) {
		if (!task || !["kneel", "stand"].includes(task.action)) return false;
		const kneeling = isPlayerKneeling();
		return (task.action === "kneel" && !kneeling) || (task.action === "stand" && kneeling);
	}

	function blockTrainingActionTask(reason) {
		const task = getCurrentBlockingTrainingTask();
		if (!task) return;
		const now = Date.now();
		if (now - lastTrainingTaskBlockNoticeAt > 2500) {
			lastTrainingTaskBlockNoticeAt = now;
			const action = TRAINING_ACTION_TASKS[task.action];
			const message = reason || `Finish ${action ? action.label : "the current task"} first.`;
			const strike = recordTrainingRuleStrike(
				"Tried to ignore the current Training task.",
				(nextStrike) => `Correction strike ${nextStrike}: finish the current Training task before doing anything else.`,
				Player && Player.MemberNumber
			);
			uiState.message = message;
			publishTrainingTaskRoomMessage("blocked", task);
			addAudit("Training task blocked other action.", `${action ? action.label : ""}${strike ? `; strike ${strike}` : ""}`, Player && Player.MemberNumber);
			saveSettings();
			log(message);
		}
	}

	function observeTrainingActionMessage(data) {
		const task = getCurrentBlockingTrainingTask();
		if (!task || !data) return false;
		if (!data.Sender || Number(data.Sender) !== (Player && Player.MemberNumber)) return false;
		const text = getMessageSearchText(data);
		if (task.action === "present" && textMatchesPresentAction(text)) {
			completeTrainingActionTask(task, "present action detected");
			return true;
		}
		if (task.action === "kneel" && text.includes("kneel")) {
			completeTrainingActionTaskIfSatisfied("kneel action detected");
			return true;
		}
		if (task.action === "stand" && text.includes("stand")) {
			completeTrainingActionTaskIfSatisfied("stand action detected");
			return true;
		}
		return false;
	}

	function textMatchesPresentAction(text) {
		return /\bpresent(?:s|ed|ing)?\b/i.test(String(text || ""));
	}

	function completeTrainingActionTaskIfSatisfied(detail) {
		const task = getCurrentBlockingTrainingTask();
		if (!task) return false;
		if (!isTrainingActionTaskSatisfied(task)) return false;
		completeTrainingActionTask(task, detail || "required action detected");
		return true;
	}

	function isTrainingActionTaskSatisfied(task) {
		if (!task) return false;
		if (task.action === "kneel") return isPlayerKneeling();
		if (task.action === "stand") return !isPlayerKneeling();
		return false;
	}

	function completeTrainingActionTask(task, detail) {
		if (!task || task.done) return;
		const openIndex = taskIndex(task);
		task.done = true;
		task.doneAt = Date.now();
		task.completedByAction = true;
		addAudit("Training action task completed.", detail || task.text, Player && Player.MemberNumber);
		saveSettings();
		uiState.message = `Training task ${openIndex} completed.`;
		publishTrainingTaskRoomMessage("complete", task);
		const ownerNumber = getFullOwnerMemberNumber();
		if (ownerNumber) respondToOwner(ownerNumber, `Task ${openIndex} completed: ${task.text}`);
	}

	function isPlayerKneeling() {
		if (!Player) return false;
		if (typeof Player.IsKneeling === "function") return Player.IsKneeling();
		if (Array.isArray(Player.Pose)) return Player.Pose.includes("Kneel");
		return Player.ActivePose === "Kneel";
	}

	function shouldBlockTrainingHonorificInput() {
		if (!isTrainingSceneActive()) return false;
		if (settings.training.honorific === "off") return false;

		const inputChat = typeof document !== "undefined" ? document.getElementById("InputChat") : null;
		if (!inputChat || typeof inputChat.value !== "string") return false;

		const text = inputChat.value.trim();
		if (!text) return false;
		if (text.startsWith("/") && !text.startsWith("//")) return false;
		if (text.startsWith("*")) return false;
		if (text.startsWith("!")) return false;

		return !inputHasRequiredHonorific(text);
	}

	function inputHasRequiredHonorific(text) {
		const lower = String(text || "").toLowerCase();
		if (settings.training.honorific === "miss") {
			return /\bmiss\b/i.test(lower);
		}
		if (settings.training.honorific === "sir") {
			return /\bsir\b/i.test(lower);
		}
		return true;
	}

	function blockTrainingHonorificSpeech() {
		const now = Date.now();
		if (now - lastHonorificBlockNoticeAt > 2500) {
			lastHonorificBlockNoticeAt = now;
			const strike = addTrainingHonorificStrike();
			uiState.message = `Training requires ${getHonorificDisplay(settings.training.honorific)}.`;
			setPlayerKneelingFromOwner(true, 0);
			publishTrainingRoomMessage("honorific-block");
			addAudit("Training honorific blocked speech.", `${getHonorificDisplay(settings.training.honorific)} missing; strike ${strike}.`, Player && Player.MemberNumber);
			saveSettings();
			log(uiState.message);
		}
	}

	function addTrainingHonorificStrike() {
		const honorific = getHonorificDisplay(settings.training.honorific);
		return recordTrainingRuleStrike(
			`${honorific} missing in Training speech.`,
			(nextStrike) => `Correction strike ${nextStrike}: include ${honorific} in the next normal spoken response.`,
			Player && Player.MemberNumber
		);
	}

	function recordTrainingRuleStrike(reason, taskTextBuilder, actor) {
		if (!isTrainingSceneActive()) return 0;
		settings.training.honorificStrikes = clampNumber((Number(settings.training.honorificStrikes) || 0) + 1, 1, 99);
		const strike = settings.training.honorificStrikes;
		const taskText = typeof taskTextBuilder === "function"
			? taskTextBuilder(strike)
			: String(taskTextBuilder || "").trim();
		if (taskText) {
			settings.tasks.push({
				id: newId("task"),
				text: taskText,
				createdAt: Date.now(),
				createdBy: actor || 0,
				done: false,
				doneAt: 0,
			});
			settings.tasks = settings.tasks.slice(-12);
		}
		maybePublishSystemStrikeScold(strike, reason);
		return strike;
	}

	function maybePublishSystemStrikeScold(strike, reason) {
		if (!settings.training.strikeAlertsEnabled) return false;
		const threshold = clampNumber(Number(settings.training.strikeThreshold) || 3, 1, 20);
		if (strike < threshold) return false;
		const strikeCheckpoint = Math.floor(strike / threshold) * threshold;
		if ((Number(settings.training.lastStrikeAlertCount) || 0) >= strikeCheckpoint) return false;

		settings.training.lastStrikeAlertCount = strikeCheckpoint;
		publishSystemStrikeScold(strikeCheckpoint, reason);
		addAudit("Training system scold sent.", `Strike ${strikeCheckpoint}: ${reason || "Training rule broken."}`, Player && Player.MemberNumber, "training");
		return true;
	}

	function publishSystemStrikeScold(strike, reason) {
		const name = getPlayerDisplayName();
		const detail = reason ? ` ${reason}` : "";
		publishClubEmote(`*The Club publicly marks Strike ${strike} against ${name}; correction is no longer subtle, and their owner is left to decide how embarrassing the lesson becomes.${detail}`);
	}

	function isUltraBcFreeButtonClick() {
		if (typeof MouseX !== "number" || typeof MouseY !== "number") return false;
		if (typeof CurrentScreen === "undefined") return false;

		if (CurrentScreen === "ChatRoom") {
			return MouseX >= 955 && MouseX < 1000 && MouseY >= 315 && MouseY < 360;
		}

		if (["PandoraPrison", "Photographic", "Cell"].includes(CurrentScreen)) {
			return MouseX >= 0 && MouseX < 45 && MouseY >= 45 && MouseY < 90;
		}

		return false;
	}

	function isChatRoomSendButtonClick() {
		if (typeof MouseX !== "number" || typeof MouseY !== "number") return false;
		if (typeof CurrentScreen !== "undefined" && CurrentScreen !== "ChatRoom") return false;
		return MouseX >= 1725 && MouseX < 1785 && MouseY >= 935 && MouseY < 995;
	}

	function isChatRoomKneelButtonClick() {
		if (typeof MouseX !== "number" || typeof MouseY !== "number") return false;
		if (typeof CurrentScreen !== "undefined" && CurrentScreen !== "ChatRoom") return false;
		return MouseX >= 1795 && MouseX < 1855 && MouseY >= 935 && MouseY < 995;
	}

	function isBlockedUltraBcEscapeCommandInput() {
		const inputChat = typeof document !== "undefined" ? document.getElementById("InputChat") : null;
		if (!inputChat || typeof inputChat.value !== "string") return false;

		const text = inputChat.value.trim().toLowerCase();
		if (!text.startsWith("/") || text.startsWith("//")) return false;

		const command = text.slice(1).split(/\s+/)[0];
		return ["totalrelease", "untie", "unlock"].includes(command);
	}

	function isBlockedWardrobeCommandInput() {
		const inputChat = typeof document !== "undefined" ? document.getElementById("InputChat") : null;
		if (!inputChat || typeof inputChat.value !== "string") return false;

		const text = inputChat.value.trim().toLowerCase();
		if (!text.startsWith("/") || text.startsWith("//")) return false;

		const command = text.slice(1).split(/\s+/)[0];
		return ["wardrobe", "wrobe"].includes(command);
	}

	function clearChatInput() {
		const inputChat = typeof document !== "undefined" ? document.getElementById("InputChat") : null;
		if (!inputChat) return;
		if (typeof ElementValue === "function") {
			ElementValue("InputChat", "");
		} else {
			inputChat.value = "";
		}
		if (typeof InputEvent === "function" && typeof inputChat.dispatchEvent === "function") {
			inputChat.dispatchEvent(new InputEvent("input"));
		}
	}

	function isUltraBcEscapeLaserMessage(data) {
		if (!data || data.Type !== "Action") return false;
		const text = getMessageSearchText(data);
		if (!text.includes("magical lasers make disappear")) return false;
		return (
			text.includes("bindings")
			|| text.includes("toys")
			|| text.includes("locks")
			|| text.includes("special restraints")
		);
	}

	function getMessageSearchText(data) {
		const parts = [data.Content || ""];
		if (Array.isArray(data.Dictionary)) {
			data.Dictionary.forEach((entry) => {
				if (!entry) return;
				if (typeof entry.Text === "string") parts.push(entry.Text);
				if (typeof entry.TextToLookUp === "string") parts.push(entry.TextToLookUp);
			});
		}
		return parts.join(" ").toLowerCase();
	}

	function observeRpArousalEmote(data) {
		if (!shouldUseRpArousal()) return;
		if (!data || data.Type !== "Emote") return;
		if (!Player || !Player.MemberNumber) return;

		const sender = Number(data.Sender);
		if (!sender) return;
		const rawContent = String(data.Content || "");
		const key = `${sender}:${rawContent}:${data.Time || data.Timestamp || ""}`;
		if (key === lastRpArousalMessageKey) return;
		lastRpArousalMessageKey = key;

		const senderCharacter = getRoomCharacter(sender);
		const text = normalizeRpEmoteText(rawContent, senderCharacter);
		if (!text || isModAuthoredEmote(text)) return;
		if (!rpArousalSenderAllowed(sender, senderCharacter)) return;
		if (sender !== Player.MemberNumber) return;

		const events = parseRpArousalEvents(text, sender, senderCharacter);
		if (!events.length) {
			if (logRpArousalMiss(text, sender, findRpArousalVerbMatches(text.toLowerCase()).length ? "No target found" : "No supported action found")) {
				saveSettings();
			}
			return;
		}

		let changed = false;
		events.forEach((event) => {
			if (!rpArousalTargetAllowed(event.target.character)) {
				changed = logRpArousalMiss(event.text, sender, "Target outside RP mode") || changed;
				return;
			}

			const activityResult = publishRpArousalActivity(event);
			const effects = getRpArousalEffectsForPlayer(event, sender);
			const before = getPlayerArousalProgress();
			let total = 0;
			effects.forEach((effect) => {
				total += applyRpArousal(effect.amount, effect).amount;
			});
			const after = getPlayerArousalProgress();

			if (total <= 0 && !activityResult.sent) {
				changed = logRpArousalMiss(event.text, sender, activityResult && activityResult.reason ? activityResult.reason : "No arousal applied") || changed;
				return;
			}

			const summary = buildRpArousalEventSummary(event, effects, total, before, after, activityResult);
			settings.rpArousal.lastEvent = summary;
			addAudit("RP arousal applied.", summary, sender, "rp");
			changed = true;
		});
		if (changed) saveSettings();
	}

	function shouldUseRpArousal() {
		return settings.enabled
			&& !settings.localEmergencyPaused
			&& settings.rpArousal
			&& settings.rpArousal.mode !== "off";
	}

	function normalizeRpEmoteText(rawContent, senderCharacter) {
		let text = String(rawContent || "").replace(/^\*+/, "").trim();
		if (!text) return "";

		const senderName = getCharacterDisplayName(senderCharacter);
		if (senderName && !startsWithAlias(text, senderName)) {
			text = `${senderName} ${text}`;
		}
		return text.replace(/\s+/g, " ").trim();
	}

	function isModAuthoredEmote(text) {
		const lower = String(text || "").toLowerCase();
		return lower.startsWith("the club ")
			|| lower.startsWith("training ")
			|| lower.includes("ultimate sub")
			|| lower.includes("ultrabc escape tools")
			|| lower.includes("wardrobe");
	}

	function logRpArousalMiss(text, sender, reason) {
		if (!settings.rpArousal || settings.rpArousal.logMisses !== true) return false;
		const detail = `${reason}: ${fitText(text, 90)}`;
		settings.rpArousal.lastEvent = fitText(`Missed: ${detail}`, 120);
		addAudit("RP emote not parsed.", detail, sender, "rp");
		return true;
	}

	function rpArousalSenderAllowed(sender, senderCharacter) {
		const mode = settings.rpArousal.mode;
		if (mode === "everyone") return true;
		if (mode !== "ownedPair") return false;
		if (sender === Player.MemberNumber) return true;
		if (isFullBcOwnerMember(sender)) return true;
		if (senderCharacter && isTargetOwnedByPlayer(senderCharacter)) return true;
		return false;
	}

	function rpArousalTargetAllowed(targetCharacter) {
		const mode = settings.rpArousal.mode;
		if (mode === "everyone") return true;
		if (mode !== "ownedPair") return false;
		if (!targetCharacter || !Player) return false;
		if (targetCharacter.MemberNumber === Player.MemberNumber) return true;
		if (isTargetOwnedByPlayer(targetCharacter)) return true;
		if (isFullBcOwnerMember(targetCharacter.MemberNumber)) return true;
		return false;
	}

	function parseRpArousalEvent(text, sender, senderCharacter) {
		return parseRpArousalEvents(text, sender, senderCharacter)[0] || null;
	}

	function parseRpArousalEvents(text, sender, senderCharacter) {
		const lower = text.toLowerCase();
		const verbs = findRpArousalVerbMatches(lower).slice(0, RP_AROUSAL_MAX_EVENTS);
		if (!verbs.length) return [];

		const events = [];
		let previousTarget = null;
		verbs.forEach((verb, index) => {
			const nextVerb = verbs[index + 1];
			const segmentEnd = nextVerb ? nextVerb.index : lower.length;
			const target = findRpArousalTarget(lower, sender, verb.index, segmentEnd, previousTarget);
			if (!target) return;

			const zone = findRpBodyZone(lower, verb.index, target, segmentEnd);
			const segmentText = text.slice(verb.index, segmentEnd).trim() || text;
			const multiplier = getRpIntensityMultiplier(segmentText.toLowerCase());
			const targetAmount = clampNumber(Math.round(verb.config.target * multiplier * getRpTargetStrengthMultiplier()), 1, 25);
			const performerAmount = clampNumber(Math.round(verb.config.performer * multiplier * getRpPerformerStrengthMultiplier()), 0, 18);

			const event = {
				text: segmentText,
				sender,
				performerName: getCharacterDisplayName(senderCharacter) || `#${sender}`,
				target,
				verb: verb.config.key,
				zone,
				targetAmount,
				performerAmount,
			};
			events.push(event);
			previousTarget = target;
		});
		return events;
	}

	function findRpArousalVerb(lowerText) {
		return findRpArousalVerbMatches(lowerText)[0] || null;
	}

	function findRpArousalVerbMatches(lowerText) {
		const matches = [];
		RP_AROUSAL_VERBS.forEach((config) => {
			const pattern = new RegExp(`\\b(${config.forms.map(escapeRegExp).join("|")})\\b`, "gi");
			let match = null;
			while ((match = pattern.exec(lowerText))) {
				const form = match[1] || "";
				if (isRpVerbFalsePositive(lowerText, match.index, form)) continue;
				matches.push({ config, index: match.index, form, formLength: form.length });
			}
		});
		return matches.sort((a, b) => a.index - b.index || b.formLength - a.formLength);
	}

	function isRpVerbFalsePositive(lowerText, index, form) {
		const lowerForm = String(form || "").toLowerCase();
		if (!["finger", "fingers", "fist", "fists"].includes(lowerForm)) return false;
		const before = lowerText.slice(Math.max(0, index - 14), index);
		return /(?:'s|her|his|their|my|your)\s+$/.test(before);
	}

	function findRpArousalTarget(lowerText, sender, verbIndex, endIndex, previousTarget) {
		const boundedEnd = typeof endIndex === "number" ? clampNumber(endIndex, verbIndex, lowerText.length) : lowerText.length;
		const afterVerb = lowerText.slice(Math.max(0, verbIndex), boundedEnd);
		let best = null;
		getRoomCharactersForRp().forEach((character) => {
			if (!character || character.MemberNumber === sender) return;
			getCharacterAliases(character).forEach((alias) => {
				const index = findAliasIndex(afterVerb, alias);
				if (index < 0) return;
				if (!best || index < best.index) {
					best = {
						index,
						absoluteIndex: Math.max(0, verbIndex) + index,
						aliasLength: alias.length,
						inferred: false,
						character,
						memberNumber: character.MemberNumber,
						name: getCharacterDisplayName(character),
					};
				}
			});
		});
		if (best) return best;
		if (isRpOwnBodyReference(afterVerb)) return null;
		if (previousTarget && (hasRpPronounReference(afterVerb) || findBestRpBodyZoneInText(afterVerb))) {
			return cloneRpArousalTarget(previousTarget, "continued");
		}
		return inferOnlyRpArousalTarget(sender);
	}

	function cloneRpArousalTarget(target, inferred) {
		return {
			...target,
			index: Number.MAX_SAFE_INTEGER,
			absoluteIndex: -1,
			aliasLength: 0,
			inferred,
		};
	}

	function hasRpPronounReference(segment) {
		return /\b(?:her|hers|him|his|them|their|theirs)\b/i.test(segment);
	}

	function isRpOwnBodyReference(segment) {
		return /\b(?:myself|my\s+own|her\s+own|his\s+own|their\s+own)\b/i.test(segment);
	}

	function inferOnlyRpArousalTarget(sender) {
		const candidates = getRoomCharactersForRp().filter((character) => character && character.MemberNumber !== sender);
		if (candidates.length !== 1) return null;
		const character = candidates[0];
		return {
			index: Number.MAX_SAFE_INTEGER,
			absoluteIndex: -1,
			aliasLength: 0,
			inferred: true,
			character,
			memberNumber: character.MemberNumber,
			name: getCharacterDisplayName(character),
		};
	}

	function findRpBodyZone(lowerText, verbIndex, target, endIndex) {
		const searches = getRpBodyZoneSearches(lowerText, verbIndex, target, endIndex);
		for (const search of searches) {
			const zone = findBestRpBodyZoneInText(search);
			if (zone) return zone;
		}
		return { zone: "ItemTorso", label: "body", words: [] };
	}

	function getRpBodyZoneSearches(lowerText, verbIndex, target, endIndex) {
		const searches = [];
		const afterVerbIndex = Math.max(0, verbIndex);
		const boundedEnd = typeof endIndex === "number" ? clampNumber(endIndex, afterVerbIndex, lowerText.length) : lowerText.length;
		if (target && !target.inferred && target.absoluteIndex >= 0) {
			searches.push(lowerText.slice(target.absoluteIndex + Math.max(0, target.aliasLength || 0), boundedEnd));
		}

		const afterVerb = lowerText.slice(afterVerbIndex, boundedEnd);
		const prepositionSearch = findRpBodyZonePrepositionSearch(afterVerb);
		if (prepositionSearch) searches.push(prepositionSearch);

		searches.push(afterVerb);
		return searches.filter((text, index, all) => text && all.indexOf(text) === index);
	}

	function findRpBodyZonePrepositionSearch(text) {
		const pattern = /\b(?:into|inside|onto|on|over|against|around|between|to|at|along|across|down|up)\b/gi;
		let match = null;
		let current = null;
		while ((current = pattern.exec(text))) {
			match = current;
		}
		if (!match) return "";
		return text.slice(match.index + match[0].length);
	}

	function findBestRpBodyZoneInText(searchText) {
		let best = null;
		RP_BODY_ZONES.forEach((zone, zoneIndex) => {
			zone.words.forEach((word) => {
				const match = new RegExp(`\\b${escapeRegExp(word)}\\b`, "i").exec(searchText);
				if (!match) return;
				const candidate = { zone, index: match.index, wordLength: word.length, zoneIndex };
				if (
					!best
					|| candidate.index < best.index
					|| (candidate.index === best.index && candidate.wordLength > best.wordLength)
					|| (candidate.index === best.index && candidate.wordLength === best.wordLength && candidate.zoneIndex < best.zoneIndex)
				) {
					best = candidate;
				}
			});
		});
		return best ? best.zone : null;
	}

	function handleRpArousalSyntheticActivity(data) {
		if (!isRpArousalSyntheticActivity(data)) return false;
		if (!shouldUseRpArousal()) return false;

		const targetMemberNumber = getDictionaryMemberNumber(data, "TargetCharacter");
		if (targetMemberNumber === (Player && Player.MemberNumber) && Number(data.Sender) !== targetMemberNumber) {
			const amount = clampNumber(Number(getDictionaryText(data, "UltimateSubRpAmount")) || 0, 0, 25);
			const zone = getDictionaryText(data, "UltimateSubRpZone") || "ItemTorso";
			if (amount > 0) {
				const before = getPlayerArousalProgress();
				const applied = applyRpArousal(amount, { zone, reason: "silent RP activity", role: "target" });
				const after = getPlayerArousalProgress();
				if (applied.amount > 0) {
					const summary = fitText(`Silent RP target +${applied.amount}; meter ${before}->${after}`, 120);
					settings.rpArousal.lastEvent = summary;
					addAudit("Silent RP arousal applied.", summary, Number(data.Sender));
					saveSettings();
				}
			}
		}

		return true;
	}

	function isRpArousalSyntheticActivity(data) {
		if (!data || !Array.isArray(data.Dictionary)) return false;
		return data.Dictionary.some((entry) => entry && entry.Tag === RP_ACTIVITY_MARKER);
	}

	function getRpIntensityMultiplier(lowerText) {
		if (RP_INTENSITY_WORDS.strong.some((word) => new RegExp(`\\b${escapeRegExp(word)}\\b`, "i").test(lowerText))) return 1.45;
		if (RP_INTENSITY_WORDS.soft.some((word) => new RegExp(`\\b${escapeRegExp(word)}\\b`, "i").test(lowerText))) return 0.65;
		return 1;
	}

	function getRpArousalEffectsForPlayer(event, sender) {
		const effects = [];
		if (Player.MemberNumber === event.target.memberNumber) {
			effects.push({
				amount: event.targetAmount,
				reason: `${event.verb} on ${event.zone.label}`,
				zone: event.zone.zone,
				role: "target",
			});
		}
		if (Player.MemberNumber === sender && event.performerAmount > 0) {
			effects.push({
				amount: event.performerAmount,
				reason: `${event.verb} as performer`,
				zone: "ActivityOnOther",
				role: "performer",
			});
		}
		return effects;
	}

	function publishRpArousalActivity(event) {
		if (!event || !event.target || !event.target.character) return { sent: false, reason: "no target" };
		if (!isPlayerInChatRoom() || typeof ServerSend !== "function" || typeof DictionaryBuilder === "undefined") {
			return { sent: false, reason: "not in room" };
		}

		const target = getRoomCharacter(event.target.memberNumber) || event.target.character;
		if (!target || target.MemberNumber === Player.MemberNumber) return { sent: false, reason: "invalid target" };

		const picked = buildForcedRpArousalActivity(target, event);
		if (!picked) return { sent: false, reason: "no allowed activity" };

		try {
			const builder = new DictionaryBuilder()
				.sourceCharacter(Player)
				.targetCharacter(target)
				.focusGroup(picked.group.Name);
			if (picked.itemActivity.Item && typeof builder.asset === "function") {
				builder.asset(
					picked.itemActivity.Item.Asset,
					"ActivityAsset",
					picked.itemActivity.Item.Craft && picked.itemActivity.Item.Craft.Name
				);
			}

			const dictionary = builder.build();
			dictionary.push({ ActivityName: picked.activity.Name });
			dictionary.push({ ActivityCounter: getRpActivityCounter(event) });
			dictionary.push({ Tag: RP_ACTIVITY_MARKER, Text: "1" });
			dictionary.push({ Tag: "UltimateSubRpAmount", Text: String(event.targetAmount) });
			dictionary.push({ Tag: "UltimateSubRpZone", Text: picked.group.Name });
			ServerSend("ChatRoomChat", {
				Content: buildRpActivityContent(target, picked.group, picked.activity),
				Type: "Activity",
				Dictionary: dictionary,
			});

			return {
				sent: true,
				activity: picked.activity.Name,
				group: picked.group.Name,
				forced: true,
			};
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not publish RP activity`, error);
			return { sent: false, reason: "send failed" };
		}
	}

	function getRpActivityCounter(event) {
		const amount = event && Number(event.targetAmount) ? Number(event.targetAmount) : 5;
		return clampNumber(Math.round(amount / 4), 1, 4);
	}

	function buildForcedRpArousalActivity(target, event) {
		const groupName = event && event.zone && event.zone.zone ? event.zone.zone : "ItemTorso";
		const group = getRpActivityGroup(target, groupName) || {
			Name: groupName,
			Description: event && event.zone && event.zone.label ? event.zone.label : groupName,
		};
		const activity = getForcedRpActivity(target, event.verb);
		if (!activity || !activity.Name) return null;
		return {
			group,
			itemActivity: {
				Activity: activity,
				Group: group.Name,
			},
			activity,
		};
	}

	function getForcedRpActivity(target, verb) {
		const candidates = RP_FORCED_ACTIVITY_CANDIDATES[verb] || ["Caress", "Lick", "Kiss"];
		for (const name of candidates) {
			if (typeof AssetGetActivity !== "function") return { Name: name };
			try {
				const activity = AssetGetActivity(target.AssetFamily, name);
				if (activity) return activity;
			} catch (error) {
				console.warn(`[${MOD_NAME}] Could not inspect forced RP activity`, error);
			}
		}
		return { Name: candidates[0] || "Caress" };
	}

	function pickRpArousalActivity(target, event) {
		let fallback = null;
		for (const groupName of getRpActivityGroupOrder(event.zone.zone)) {
			const activities = getRpAllowedActivities(target, groupName);
			if (!activities.length) continue;

			for (const itemActivity of activities) {
				const group = getRpActivityGroup(target, itemActivity.Group || groupName);
				if (!group || !itemActivity.Activity) continue;
				const candidate = {
					group,
					itemActivity,
					activity: itemActivity.Activity,
					score: scoreRpActivity(itemActivity.Activity, event.verb),
				};
				if (!fallback) fallback = candidate;
				if (candidate.score > 0 && (!fallback || candidate.score > fallback.score)) fallback = candidate;
			}
		}
		return fallback && fallback.activity ? fallback : null;
	}

	function getRpActivityGroupOrder(primaryGroup) {
		const groups = [];
		addUniqueGroup(groups, primaryGroup);
		if (primaryGroup === "ItemLegs") {
			addUniqueGroup(groups, "ItemFeet");
			addUniqueGroup(groups, "ItemButt");
		}
		if (primaryGroup === "ItemBoots") {
			addUniqueGroup(groups, "ItemFeet");
		}
		if (primaryGroup === "ItemVulva") {
			addUniqueGroup(groups, "ItemPelvis");
			addUniqueGroup(groups, "ItemButt");
		}
		if (primaryGroup === "ItemMouth") {
			addUniqueGroup(groups, "ItemHead");
		}
		addUniqueGroup(groups, "ItemTorso");
		addUniqueGroup(groups, "ItemHands");
		return groups;
	}

	function addUniqueGroup(groups, groupName) {
		if (groupName && !groups.includes(groupName)) groups.push(groupName);
	}

	function getRpAllowedActivities(target, groupName) {
		if (typeof ActivityAllowedForGroup !== "function") return [];
		try {
			const activities = ActivityAllowedForGroup(target, groupName);
			return Array.isArray(activities) ? activities : [];
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not get RP activities for ${groupName}`, error);
			return [];
		}
	}

	function getRpActivityGroup(target, groupName) {
		if (!target || !groupName) return null;
		if (typeof ActivityGetGroupOrMirror === "function") {
			try {
				const group = ActivityGetGroupOrMirror(target.AssetFamily, groupName);
				if (group) return group;
			} catch (error) {
				console.warn(`[${MOD_NAME}] Could not get mirrored RP group`, error);
			}
		}
		if (typeof AssetGroupGet === "function") {
			try {
				return AssetGroupGet(target.AssetFamily, groupName);
			} catch (error) {
				console.warn(`[${MOD_NAME}] Could not get RP group`, error);
			}
		}
		return null;
	}

	function scoreRpActivity(activity, verb) {
		if (!activity || !activity.Name) return 0;
		const name = activity.Name.toLowerCase();
		const keywords = RP_ACTIVITY_KEYWORDS[verb] || [verb];
		let score = 0;
		keywords.forEach((keyword, index) => {
			if (name.includes(keyword)) score = Math.max(score, 100 - index * 5);
		});
		return score;
	}

	function buildRpActivityContent(target, group, activity) {
		if (typeof ActivityBuildChatTag === "function") {
			try {
				return ActivityBuildChatTag(target, group, activity);
			} catch (error) {
				console.warn(`[${MOD_NAME}] Could not build BC activity tag`, error);
			}
		}

		const groupMap = { ItemVulva: "ItemPenis", ItemVulvaPiercings: "ItemGlans" };
		const hasPenis = target && typeof target.HasPenis === "function" && target.HasPenis();
		const realGroup = hasPenis && groupMap[group.Name] ? groupMap[group.Name] : group.Name;
		const targetKind = target && typeof target.IsPlayer === "function" && target.IsPlayer() ? "ChatSelf" : "ChatOther";
		return `${targetKind}-${realGroup}-${activity.Name}`;
	}

	function applyRpArousal(amount, effect) {
		if (!canReceiveRpArousal()) return { amount: 0, before: getPlayerArousalProgress(), after: getPlayerArousalProgress() };
		const value = clampNumber(Number(amount) || 0, 0, 25);
		const before = getPlayerArousalProgress();
		if (value <= 0) return { amount: 0, before, after: before };

		try {
			const targetProgress = clampNumber(before + value, 0, 100);
			if (typeof ActivitySetArousal === "function") {
				ActivitySetArousal(Player, targetProgress);
			} else if (Player.ArousalSettings) {
				Player.ArousalSettings.Progress = targetProgress;
			}
			setRpArousalTimer(value, effect && effect.zone ? effect.zone : "ItemTorso");
			syncRpArousal();
			refreshRpArousalCharacter();
			const after = getPlayerArousalProgress();
			return { amount: Math.max(0, after - before), before, after };
		} catch (error) {
			console.warn(`[${MOD_NAME}] Direct RP arousal failed`, error);
		}

		try {
			if (typeof ActivityTimerProgress === "function") {
				ActivityTimerProgress(Player, value);
				syncRpArousal();
				refreshRpArousalCharacter();
			}
			const after = getPlayerArousalProgress();
			return { amount: Math.max(0, after - before), before, after };
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not apply RP arousal for ${effect && effect.reason ? effect.reason : "RP"}`, error);
			return { amount: 0, before, after: getPlayerArousalProgress() };
		}
	}

	function getPlayerArousalProgress() {
		if (!Player || !Player.ArousalSettings || typeof Player.ArousalSettings.Progress !== "number") return 0;
		return clampNumber(Math.round(Player.ArousalSettings.Progress), 0, 100);
	}

	function setRpArousalTimer(value, zone) {
		if (!Player || !Player.ArousalSettings) return;
		const timerValue = clampNumber(Math.round(Number(value) || 0), 0, 25);
		if (timerValue <= 0) return;

		if (typeof ActivitySetArousalTimer === "function") {
			try {
				ActivitySetArousalTimer(Player, null, zone || "ItemTorso", timerValue);
				return;
			} catch (error) {
				console.warn(`[${MOD_NAME}] Could not set RP arousal timer`, error);
			}
		}

		Player.ArousalSettings.ProgressTimer = timerValue;
	}

	function syncRpArousal() {
		if (!Player || !Player.ArousalSettings) return;
		if (typeof ActivityChatRoomArousalSync === "function") {
			ActivityChatRoomArousalSync(Player);
			return;
		}
		if (typeof ServerSend === "function" && isPlayerInChatRoom()) {
			ServerSend("ChatRoomCharacterArousalUpdate", {
				OrgasmTimer: Player.ArousalSettings.OrgasmTimer || 0,
				Progress: Player.ArousalSettings.Progress || 0,
				ProgressTimer: Player.ArousalSettings.ProgressTimer || 0,
				OrgasmCount: Player.ArousalSettings.OrgasmCount || 0,
			});
		}
	}

	function refreshRpArousalCharacter() {
		try {
			if (typeof CharacterRefresh === "function") CharacterRefresh(Player, false);
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not refresh RP arousal character`, error);
		}
	}

	function canReceiveRpArousal() {
		if (!Player || !Player.ArousalSettings) return false;
		const active = String(Player.ArousalSettings.Active || "").toLowerCase();
		return active !== "inactive" && active !== "none" && active !== "no";
	}

	function buildRpArousalEventSummary(event, effects, total, before, after, activityResult) {
		const roles = effects.map((effect) => effect.role).join("+");
		const activity = activityResult && activityResult.sent
			? `${activityResult.forced ? "forced" : "sent"} ${activityResult.activity} on ${activityResult.group}`
			: `target ${activityResult && activityResult.reason ? activityResult.reason : "not sent"}`;
		const performer = roles ? `${roles} +${total}; meter ${before}->${after}` : "performer off";
		return fitText(`${event.performerName} ${event.verb} -> ${event.target.name} (${event.zone.label}); ${activity}; ${performer}`, 120);
	}

	function getRoomCharactersForRp() {
		if (typeof ChatRoomCharacter !== "undefined" && Array.isArray(ChatRoomCharacter)) return ChatRoomCharacter;
		return Player ? [Player] : [];
	}

	function getCharacterAliases(character) {
		const aliases = new Set();
		const display = getCharacterDisplayName(character);
		if (display) aliases.add(display);
		if (character && character.Name) aliases.add(character.Name);
		if (character && character.Nickname) aliases.add(character.Nickname);
		return [...aliases].map((alias) => String(alias || "").trim()).filter((alias) => alias.length >= 2);
	}

	function getCharacterDisplayName(character) {
		if (!character) return "";
		try {
			if (typeof CharacterNickname === "function") return CharacterNickname(character);
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not read character nickname`, error);
		}
		return character.Nickname || character.Name || "";
	}

	function startsWithAlias(text, alias) {
		return findAliasIndex(String(text || "").slice(0, String(alias || "").length + 3).toLowerCase(), alias) === 0;
	}

	function findAliasIndex(lowerText, alias) {
		const lowerAlias = String(alias || "").toLowerCase();
		if (!lowerAlias) return -1;
		const pattern = new RegExp(`(^|[^a-z0-9])${escapeRegExp(lowerAlias)}(?:'s|[^a-z0-9]|$)`, "i");
		const match = lowerText.match(pattern);
		if (!match) return -1;
		return match.index + (match[1] ? match[1].length : 0);
	}

	function handleOwnerCommand(data) {
		if (!data || !["Chat", "Whisper", "Hidden"].includes(data.Type)) return false;

		const rawContent = typeof data.Content === "string" ? data.Content.trim() : "";
		const parsedCommand = data.Type === "Hidden" && rawContent === "UltimateSubCommand"
			? getDictionaryText(data, "UltimateSubCommand")
			: parseUltimateSubCommand(rawContent);
		if (!parsedCommand) return false;
		if (Number(data.Sender) === (Player && Player.MemberNumber)) return false;
		if ((data.Type === "Whisper" || data.Type === "Hidden") && data.Target && Number(data.Target) !== (Player && Player.MemberNumber)) return false;

		const sender = Number(data.Sender);
		if (!settings.enabled || settings.localEmergencyPaused) {
			addAudit("Command ignored while paused.", rawContent, sender);
			respondToOwner(sender, "Owner commands are locally paused.");
			return true;
		}

		if (!isFullBcOwnerMember(sender)) {
			addAudit("Unauthorized command ignored.", rawContent, sender);
			saveSettings();
			respondToOwner(sender, `Command ignored: owner check failed. ${getOwnerCheckDebug(sender)}`);
			return true;
		}

		const args = parsedCommand.split(/\s+/).filter(Boolean);
		const command = (args.shift() || "help").toLowerCase();

		if (command === "help") {
			respondToOwner(sender, "Commands: status, ubc lock/unlock, wardrobe lock/unlock, rp status/mode/target/performer, training start/end/kneel/ubc/wardrobe/honorific/posture/attention/praise/scold/strikes, scene public/quiet/aftercare/off, task action/list/add/done/clear, restraint list/save/add/apply/remove/delete/clear, punish scoldkneel/apology, token grant/revoke/clear. Buttons are preferred.");
			return true;
		}

		if (command === "status") {
			respondToOwner(sender, buildOwnerStatus());
			addAudit("Status requested.", "", sender);
			saveSettings();
			return true;
		}

		if (command === "ubc" || command === "ultrabc") {
			handleUltraBcCommand(args, sender);
			return true;
		}

		if (command === "wardrobe" || command === "wrobe") {
			handleWardrobeCommand(args, sender);
			return true;
		}

		if (command === "rp" || command === "rpa" || command === "arousal") {
			handleRpArousalCommand(args, sender);
			return true;
		}

		if (command === "scene" || command === "mode") {
			handleSceneCommand(args, sender);
			return true;
		}

		if (command === "training" || command === "train") {
			handleTrainingCommand(args, sender);
			return true;
		}

		if (command === "task" || command === "tasks") {
			handleTaskCommand(args, sender);
			return true;
		}

		if (command === "restraint" || command === "restraints") {
			handleRestraintCommand(args, sender);
			return true;
		}

		if (command === "punish" || command === "correction" || command === "strike") {
			handlePunishmentCommand(args, sender);
			return true;
		}

		if (command === "token" || command === "tokens") {
			handleTokenCommand(args, sender);
			return true;
		}

		respondToOwner(sender, "Unknown Ultimate Sub command. Use USCMD help.");
		return true;
	}

	function parseUltimateSubCommand(rawContent) {
		const content = String(rawContent || "").trim();
		const lower = content.toLowerCase();
		if (lower === "!us") return "help";
		if (lower.startsWith("!us ")) return content.slice(4).trim() || "help";
		if (lower === "uscmd") return "help";
		if (lower.startsWith("uscmd ")) return content.slice(6).trim() || "help";
		if (lower.startsWith("uscmd:")) return content.slice(6).trim() || "help";
		return "";
	}

	function getDictionaryText(data, tag) {
		if (!data || !Array.isArray(data.Dictionary)) return "";
		const entry = data.Dictionary.find((item) => item && item.Tag === tag);
		if (!entry) return "";
		if (typeof entry.Text === "string") return entry.Text;
		if (typeof entry.TextToLookUp === "string") return entry.TextToLookUp;
		return "";
	}

	function getDictionaryMemberNumber(data, tag) {
		if (!data || !Array.isArray(data.Dictionary)) return 0;
		const entry = data.Dictionary.find((item) => item && (
			item.Tag === tag
			|| (tag === "TargetCharacter" && typeof item.TargetCharacter === "number")
			|| (tag === "SourceCharacter" && typeof item.SourceCharacter === "number")
		));
		if (!entry) return 0;
		if (typeof entry.TargetCharacter === "number") return Number(entry.TargetCharacter) || 0;
		if (typeof entry.SourceCharacter === "number") return Number(entry.SourceCharacter) || 0;
		if (typeof entry.MemberNumber === "number") return Number(entry.MemberNumber) || 0;
		return 0;
	}

	function handleUltraBcCommand(args, sender) {
		const action = (args.shift() || "status").toLowerCase();
		if (["lock", "on", "noescape"].includes(action)) {
			setUltraBcEscapeToolsLocked(true, "Owner locked UltraBC escape tools.", sender);
			respondToOwner(sender, "UltraBC escape tools hard-locked.");
			return;
		}
		if (["unlock", "off", "allow"].includes(action)) {
			setUltraBcEscapeToolsLocked(false, "Owner allowed UltraBC escape tools.", sender);
			respondToOwner(sender, "UltraBC escape tools allowed.");
			return;
		}
		respondToOwner(sender, settings.ultraBcEscapeToolsLocked ? "UltraBC escape tools are locked." : "UltraBC escape tools are allowed.");
	}

	function handleWardrobeCommand(args, sender) {
		const action = (args.shift() || "status").toLowerCase();
		if (["toggle", "switch"].includes(action)) {
			const locked = !settings.wardrobeCommandLocked;
			setWardrobeCommandLocked(locked, locked ? "Owner locked the wardrobe command." : "Owner allowed the wardrobe command.", sender);
			respondToOwner(sender, locked ? "Wardrobe command locked." : "Wardrobe command allowed.");
			return;
		}
		if (["lock", "block", "off"].includes(action)) {
			setWardrobeCommandLocked(true, "Owner locked the wardrobe command.", sender);
			respondToOwner(sender, "Wardrobe command locked.");
			return;
		}
		if (["unlock", "allow", "on"].includes(action)) {
			setWardrobeCommandLocked(false, "Owner allowed the wardrobe command.", sender);
			respondToOwner(sender, "Wardrobe command allowed.");
			return;
		}
		respondToOwner(sender, getWardrobeCommandStatusText());
	}

	function setWardrobeCommandLocked(locked, message, actor) {
		settings.wardrobeCommandLocked = locked;
		addAudit(locked ? "Wardrobe command locked." : "Wardrobe command allowed.", message || "", actor);
		saveSettings();
		uiState.message = message || (locked ? "Wardrobe command locked." : "Wardrobe command allowed.");
	}

	function handleRpArousalCommand(args, sender) {
		const action = (args.shift() || "status").toLowerCase();
		if (action === "status") {
			respondToOwner(sender, buildRpArousalStatusLine());
			return;
		}

		if (action === "mode") {
			const value = normalizeRpArousalMode(args.shift());
			settings.rpArousal.mode = value || nextCycleValue(RP_AROUSAL_MODES, settings.rpArousal.mode);
			addAudit("RP Arousal mode changed.", getRpArousalModeDisplay(settings.rpArousal.mode), sender);
			saveSettings();
			uiState.message = `RP Arousal: ${getRpArousalModeDisplay(settings.rpArousal.mode)}.`;
			respondToOwner(sender, buildRpArousalStatusLine());
			return;
		}

		if (action === "target") {
			const value = normalizeRpTargetStrength(args.shift());
			settings.rpArousal.targetStrength = value || nextCycleValue(RP_TARGET_STRENGTHS, settings.rpArousal.targetStrength);
			addAudit("RP target effect changed.", settings.rpArousal.targetStrength, sender);
			saveSettings();
			uiState.message = `RP target effect: ${settings.rpArousal.targetStrength}.`;
			respondToOwner(sender, buildRpArousalStatusLine());
			return;
		}

		if (action === "performer" || action === "actor") {
			const value = normalizeRpPerformerStrength(args.shift());
			settings.rpArousal.performerStrength = value || nextCycleValue(RP_PERFORMER_STRENGTHS, settings.rpArousal.performerStrength);
			addAudit("RP performer effect changed.", settings.rpArousal.performerStrength, sender);
			saveSettings();
			uiState.message = `RP performer effect: ${settings.rpArousal.performerStrength}.`;
			respondToOwner(sender, buildRpArousalStatusLine());
			return;
		}

		respondToOwner(sender, "Unknown RP Arousal control.");
	}

	function buildRpArousalStatusLine() {
		const rp = settings.rpArousal;
		return `RP arousal: ${getRpArousalModeDisplay(rp.mode)}; target ${rp.targetStrength}; performer ${rp.performerStrength}; US output silent.`;
	}

	function handleSceneCommand(args, sender) {
		const sceneKey = normalizeSceneKey(args.shift() || "none");
		if (!sceneKey) {
			respondToOwner(sender, "Unknown scene. Use training, public, quiet, aftercare, or off.");
			return;
		}

		setSceneModeFromOwner(sceneKey, sender);
	}

	function setSceneModeFromOwner(sceneKey, sender) {
		const previousScene = settings.sceneMode;
		settings.sceneMode = sceneKey;
		const scene = SCENE_MODES[sceneKey];
		let bcEffect = "";

		if (sceneKey === "training") {
			bcEffect = applyTrainingSceneStart(sender);
		} else if (sceneKey === "public") {
			settings.ultraBcEscapeToolsLocked = true;
			settings.ultraBcAutoRelockAt = 0;
			syncUltraBcNoEscape(true);
			bcEffect = applySceneBcEffects(sceneKey, sender);
		} else if (sceneKey === "aftercare") {
			releaseTrainingSceneLocks();
			settings.ultraBcEscapeToolsLocked = false;
			settings.ultraBcAutoRelockAt = 0;
			settings.wardrobeCommandLocked = false;
			syncUltraBcNoEscape(false);
			bcEffect = applySceneBcEffects(sceneKey, sender);
		} else if (sceneKey === "none" && previousScene === "training") {
			releaseTrainingSceneLocks();
			bcEffect = applyTrainingSceneEnd(sender);
		}

		addAudit(`Scene set to ${scene.name}.`, [scene.description, bcEffect].filter(Boolean).join(" "), sender);
		saveSettings();
		uiState.message = `Scene set to ${scene.name}.`;
		broadcastTrainingPresence(true);
		respondToOwner(sender, `Scene set to ${scene.name}.${bcEffect ? ` ${bcEffect}` : ""}`);
	}

	function applySceneBcEffects(sceneKey, sender) {
		if (sceneKey === "training" || sceneKey === "public") {
			return setPlayerKneelingFromOwner(true, sender);
		}

		if (sceneKey === "aftercare") {
			return setPlayerKneelingFromOwner(false, sender);
		}

		return "";
	}

	function applyTrainingSceneStart(sender) {
		const effects = [];
		if (settings.training.lockUltraBc) {
			if (!settings.ultraBcEscapeToolsLocked) settings.training.appliedUltraBcLock = true;
			settings.ultraBcEscapeToolsLocked = true;
			settings.ultraBcAutoRelockAt = 0;
			syncUltraBcNoEscape(true);
			effects.push("UltraBC locked.");
		} else {
			settings.training.appliedUltraBcLock = false;
		}

		if (settings.training.lockWardrobe) {
			if (!settings.wardrobeCommandLocked) settings.training.appliedWardrobeLock = true;
			settings.wardrobeCommandLocked = true;
			effects.push("Wardrobe command locked.");
		} else {
			settings.training.appliedWardrobeLock = false;
		}

		if (settings.training.forceKneel) {
			effects.push(setPlayerKneelingFromOwner(true, sender));
		}

		if (settings.training.announceStart) {
			publishTrainingRoomMessage("start");
		}

		return effects.filter(Boolean).join(" ");
	}

	function applyTrainingSceneEnd(sender) {
		const effect = settings.training.forceKneel ? setPlayerKneelingFromOwner(false, sender) : "";
		publishTrainingRoomMessage("end");
		return effect;
	}

	function releaseTrainingSceneLocks() {
		if (settings.training.appliedUltraBcLock) {
			settings.ultraBcEscapeToolsLocked = false;
			settings.ultraBcAutoRelockAt = 0;
			syncUltraBcNoEscape(false);
		}
		if (settings.training.appliedWardrobeLock) {
			settings.wardrobeCommandLocked = false;
		}
		settings.training.appliedUltraBcLock = false;
		settings.training.appliedWardrobeLock = false;
	}

	function setPlayerKneelingFromOwner(kneel, sender) {
		if (!Player || typeof PoseSetActive !== "function") return "";
		if (!isPlayerInChatRoom()) return "";

		const alreadyKneeling = Player.IsKneeling && Player.IsKneeling();
		if (alreadyKneeling === kneel) return kneel ? "Already kneeling." : "Already standing.";

		try {
			PoseSetActive(Player, kneel ? "Kneel" : "BaseLower", false);
			if (typeof CharacterRefresh === "function") {
				CharacterRefresh(Player);
			}
			if (typeof ServerSend === "function") {
				ServerSend("ChatRoomCharacterPoseUpdate", { Pose: Player.ActivePose });
			}
			publishOwnerPoseAction(kneel, sender);
			return kneel ? "Pose changed to kneel." : "Pose changed to stand.";
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not change player pose`, error);
			return "Could not change pose.";
		}
	}

	function publishOwnerPoseAction(kneel, sender) {
		try {
			const senderCharacter = getRoomCharacter(sender);
			if (!senderCharacter || typeof DictionaryBuilder === "undefined" || typeof ServerSend !== "function") return;
			const dictionary = new DictionaryBuilder()
				.sourceCharacter(senderCharacter)
				.targetCharacter(Player)
				.build();
			ServerSend("ChatRoomChat", {
				Content: kneel ? "HelpKneelDown" : "HelpStandUp",
				Type: "Action",
				Dictionary: dictionary,
			});
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not publish owner pose action`, error);
		}
	}

	function handleTrainingCommand(args, sender) {
		const action = (args.shift() || "status").toLowerCase();
		if (action === "start" || action === "on") {
			setSceneModeFromOwner("training", sender);
			return;
		}

		if (action === "end" || action === "off" || action === "stop") {
			setSceneModeFromOwner("none", sender);
			return;
		}

		if (action === "status") {
			respondToOwner(sender, buildTrainingStatusLine());
			return;
		}

		if (action === "kneel" || action === "posturelock") {
			setTrainingFlag("forceKneel", args.shift(), "Kneel lock", sender, () => {
				if (isTrainingSceneActive() && settings.training.forceKneel) {
					return setPlayerKneelingFromOwner(true, sender);
				}
				return "";
			});
			return;
		}

		if (action === "ubc" || action === "escape") {
			setTrainingFlag("lockUltraBc", args.shift(), "UltraBC lock", sender, () => {
				if (!isTrainingSceneActive()) return "";
				if (settings.training.lockUltraBc) {
					if (!settings.ultraBcEscapeToolsLocked) settings.training.appliedUltraBcLock = true;
					settings.ultraBcEscapeToolsLocked = true;
					settings.ultraBcAutoRelockAt = 0;
					syncUltraBcNoEscape(true);
					return "UltraBC locked for Training.";
				}
				if (settings.training.appliedUltraBcLock) {
					settings.ultraBcEscapeToolsLocked = false;
					settings.ultraBcAutoRelockAt = 0;
					settings.training.appliedUltraBcLock = false;
					syncUltraBcNoEscape(false);
					return "Training UltraBC lock released.";
				}
				return "";
			});
			return;
		}

		if (action === "wardrobe" || action === "wrobe") {
			setTrainingFlag("lockWardrobe", args.shift(), "Wardrobe lock", sender, () => {
				if (!isTrainingSceneActive()) return "";
				if (settings.training.lockWardrobe) {
					if (!settings.wardrobeCommandLocked) settings.training.appliedWardrobeLock = true;
					settings.wardrobeCommandLocked = true;
					return "Wardrobe locked for Training.";
				}
				if (settings.training.appliedWardrobeLock) {
					settings.wardrobeCommandLocked = false;
					settings.training.appliedWardrobeLock = false;
					return "Training wardrobe lock released.";
				}
				return "";
			});
			return;
		}

		if (action === "announce" || action === "message") {
			setTrainingFlag("announceStart", args.shift(), "Start message", sender);
			return;
		}

		if (action === "honorific") {
			const requestedHonorific = args.shift();
			const honorific = String(requestedHonorific || "").toLowerCase() === "cycle"
				? nextHonorific(settings.training.honorific)
				: normalizeHonorific(requestedHonorific);
			if (!honorific) {
				respondToOwner(sender, "Honorific can be Off, Miss, or Sir.");
				return;
			}
			settings.training.honorific = honorific;
			settings.training.honorificStrikes = 0;
			settings.training.lastStrikeAlertCount = 0;
			addAudit("Training honorific changed.", getHonorificDisplay(honorific), sender);
			saveSettings();
			uiState.message = `Training honorific: ${getHonorificDisplay(honorific)}.`;
			if (isTrainingSceneActive() && honorific !== "off") publishTrainingRoomMessage("honorific");
			respondToOwner(sender, `${buildTrainingStatusLine()} Honorific changed.`);
			return;
		}

		if (action === "strikes" || action === "punishments" || action === "corrections") {
			const strikeAction = (args.shift() || "status").toLowerCase();
			if (["clear", "reset", "off"].includes(strikeAction)) {
				settings.training.honorificStrikes = 0;
				settings.training.lastStrikeAlertCount = 0;
				addAudit("Training strikes cleared.", "", sender);
				saveSettings();
				uiState.message = "Training strikes cleared.";
				respondToOwner(sender, buildTrainingStatusLine());
				return;
			}
			if (["limit", "threshold", "after"].includes(strikeAction)) {
				const threshold = clampNumber(Number(args.shift()) || settings.training.strikeThreshold || 3, 1, 20);
				settings.training.strikeThreshold = threshold;
				settings.training.lastStrikeAlertCount = 0;
				addAudit("Training system scold threshold changed.", String(threshold), sender);
				saveSettings();
				uiState.message = `Training system scold after ${threshold}.`;
				respondToOwner(sender, buildTrainingStatusLine());
				return;
			}
			if (["alert", "alerts", "popup", "popups"].includes(strikeAction)) {
				const nextValue = normalizeToggleValue(args.shift(), !settings.training.strikeAlertsEnabled);
				settings.training.strikeAlertsEnabled = nextValue;
				if (!nextValue) settings.training.lastStrikeAlertCount = settings.training.honorificStrikes || 0;
				addAudit("Training system scold changed.", nextValue ? "on" : "off", sender);
				saveSettings();
				uiState.message = `Training system scold: ${nextValue ? "On" : "Off"}.`;
				respondToOwner(sender, buildTrainingStatusLine());
				return;
			}
			respondToOwner(sender, `${settings.training.honorificStrikes || 0} Training strikes.`);
			return;
		}

		if (action === "posture" || action === "check") {
			const effect = setPlayerKneelingFromOwner(true, sender);
			publishTrainingRoomMessage("posture");
			addAudit("Training posture check.", effect, sender);
			saveSettings();
			respondToOwner(sender, `Posture check sent.${effect ? ` ${effect}` : ""}`);
			return;
		}

		if (action === "attention") {
			publishTrainingRoomMessage("attention");
			addAudit("Training attention called.", "", sender);
			saveSettings();
			respondToOwner(sender, "Attention message sent.");
			return;
		}

		if (action === "praise") {
			publishTrainingRoomMessage("praise");
			addAudit("Training praise sent.", "", sender);
			saveSettings();
			respondToOwner(sender, "Praise message sent.");
			return;
		}

		if (action === "scold") {
			publishTrainingRoomMessage("scold");
			addAudit("Training scold sent.", "", sender);
			saveSettings();
			respondToOwner(sender, "Scold message sent.");
			return;
		}

		respondToOwner(sender, "Unknown Training control.");
	}

	function setTrainingFlag(key, requestedValue, label, sender, applyActiveEffect) {
		const nextValue = normalizeToggleValue(requestedValue, !settings.training[key]);
		settings.training[key] = nextValue;
		const activeEffect = typeof applyActiveEffect === "function" ? applyActiveEffect() : "";
		addAudit(`Training ${label.toLowerCase()} ${nextValue ? "enabled" : "disabled"}.`, activeEffect, sender);
		saveSettings();
		uiState.message = `Training ${label}: ${nextValue ? "On" : "Off"}.`;
		respondToOwner(sender, `${buildTrainingStatusLine()}${activeEffect ? ` ${activeEffect}` : ""}`);
	}

	function normalizeToggleValue(value, fallback) {
		const lower = String(value || "").toLowerCase();
		if (["on", "yes", "true", "lock"].includes(lower)) return true;
		if (["off", "no", "false", "allow", "unlock"].includes(lower)) return false;
		return fallback;
	}

	function isTrainingSceneActive() {
		return settings.enabled && !settings.localEmergencyPaused && settings.sceneMode === "training";
	}

	function normalizeSceneKey(value) {
		const lower = String(value || "").toLowerCase();
		if (lower === "off" || lower === "clear" || lower === "none") return "none";
		if (lower === "display") return "public";
		return SCENE_MODES[lower] ? lower : "";
	}

	function handleTaskCommand(args, sender) {
		const action = (args.shift() || "list").toLowerCase();
		if (action === "action" || action === "training") {
			createTrainingActionTask(args.shift(), sender);
			return;
		}

		if (action === "add") {
			const taskText = args.join(" ").trim();
			if (!taskText) {
				respondToOwner(sender, "Task text is missing.");
				return;
			}
			const task = {
				id: newId("task"),
				text: taskText,
				createdAt: Date.now(),
				createdBy: sender,
				done: false,
				doneAt: 0,
			};
			settings.tasks.push(task);
			settings.tasks = settings.tasks.slice(-12);
			addAudit("Task added.", taskText, sender);
			saveSettings();
			uiState.message = "Owner task added.";
			respondToOwner(sender, `Task ${taskIndex(task)} added.`);
			return;
		}

		if (action === "done" || action === "complete") {
			const task = findTask(args.shift());
			if (!task) {
				respondToOwner(sender, "Task not found.");
				return;
			}
			task.done = true;
			task.doneAt = Date.now();
			addAudit("Task completed.", task.text, sender);
			saveSettings();
			uiState.message = "Owner task completed.";
			respondToOwner(sender, `Task ${taskIndex(task)} completed.`);
			return;
		}

		if (action === "clear") {
			settings.tasks = [];
			addAudit("Tasks cleared.", "", sender);
			saveSettings();
			uiState.message = "Owner tasks cleared.";
			respondToOwner(sender, "All tasks cleared.");
			return;
		}

		respondToOwner(sender, buildTaskListResponse());
	}

	function buildTaskListResponse() {
		const openTasks = settings.tasks.filter((task) => !task.done);
		if (!openTasks.length) return "No open tasks.";
		const currentTask = getCurrentBlockingTrainingTask();
		const taskList = openTasks
			.slice(0, 8)
			.map((task) => `${taskIndex(task)}. ${task === currentTask ? "[Current] " : ""}${fitText(task.text, 42)}`)
			.join(" | ");
		const extraCount = openTasks.length > 8 ? ` | plus ${openTasks.length - 8} more` : "";
		return `Open tasks (${openTasks.length}): ${taskList}${extraCount}`;
	}

	function handlePunishmentCommand(args, sender) {
		const action = (args.shift() || "scoldkneel").toLowerCase();
		if (action === "scoldkneel" || action === "kneel" || action === "posture") {
			const effect = setPlayerKneelingFromOwner(true, sender);
			publishTrainingRoomMessage("scold");
			addAudit("Strike punishment used.", `Scold + kneel. ${effect}`, sender, "training");
			saveSettings();
			respondToOwner(sender, `Strike response applied. ${effect}`);
			return;
		}

		if (action === "apology" || action === "task") {
			const strike = settings.training.honorificStrikes || 0;
			const taskText = `Apologize properly to owner for reaching ${strike} Training strike${strike === 1 ? "" : "s"}.`;
			settings.tasks.push({
				id: newId("task"),
				text: taskText,
				createdAt: Date.now(),
				createdBy: sender,
				done: false,
				doneAt: 0,
			});
			settings.tasks = settings.tasks.slice(-12);
			addAudit("Strike apology task added.", taskText, sender, "tasks");
			saveSettings();
			uiState.message = "Strike apology task added.";
			respondToOwner(sender, `Task ${settings.tasks.filter((task) => !task.done).length} added: apology.`);
			return;
		}

		if (action === "scold") {
			publishTrainingRoomMessage("scold");
			addAudit("Strike scold used.", "", sender, "training");
			saveSettings();
			respondToOwner(sender, "Scold sent.");
			return;
		}

		respondToOwner(sender, "Unknown strike response.");
	}

	function handleRestraintCommand(args, sender) {
		const action = (args.shift() || "list").toLowerCase();
		const raw = args.join(" ").trim();

		if (action === "list" || action === "status") {
			respondToOwner(sender, buildRestraintListResponse());
			return;
		}

		if (action === "save" || action === "capture") {
			const request = parseRestraintSaveInput(raw);
			if (!request.group) {
				respondToOwner(sender, "Choose a worn slot to save, like ItemMouth|Training Gag.");
				return;
			}
			saveWornRestraintPreset(request.group, request.label, sender);
			return;
		}

		if (action === "add" || action === "regular") {
			const request = parseRestraintAddInput(raw);
			if (!request.group || !request.asset) {
				respondToOwner(sender, "Use Group|Asset|Label, like ItemMouth|BallGag|Basic Gag.");
				return;
			}
			addRegularRestraintPreset(request.group, request.asset, request.label, sender);
			return;
		}

		if (action === "apply" || action === "wear") {
			applyRestraintPreset(args.shift() || raw || "1", sender);
			return;
		}

		if (action === "remove" || action === "strip") {
			const group = normalizeRestraintGroupName(raw || args.shift());
			if (!group) {
				respondToOwner(sender, "Choose a slot to remove, like ItemMouth.");
				return;
			}
			removeRestraintGroup(group, sender);
			return;
		}

		if (action === "delete" || action === "forget") {
			deleteRestraintPreset(args.shift() || raw || "1", sender);
			return;
		}

		if (action === "clear") {
			settings.restraints.presets = [];
			addAudit("Restraint presets cleared.", "", sender, "locks");
			saveSettings();
			uiState.message = "Restraint presets cleared.";
			respondToOwner(sender, buildRestraintListResponse());
			return;
		}

		respondToOwner(sender, "Unknown restraint control.");
	}

	function parseRestraintSaveInput(raw) {
		const text = String(raw || "").trim();
		if (!text) return { group: "", label: "" };
		if (text.includes("|")) {
			const parts = text.split("|").map((part) => part.trim());
			return {
				group: normalizeRestraintGroupName(parts[0]),
				label: parts.slice(1).join(" ").trim(),
			};
		}
		const parts = text.split(/\s+/);
		const group = normalizeRestraintGroupName(parts.shift());
		return { group, label: parts.join(" ").trim() };
	}

	function parseRestraintAddInput(raw) {
		const text = String(raw || "").trim();
		if (!text) return { group: "", asset: "", label: "" };
		if (text.includes("|")) {
			const parts = text.split("|").map((part) => part.trim());
			return {
				group: normalizeRestraintGroupName(parts[0]),
				asset: parts[1] || "",
				label: parts.slice(2).join(" ").trim(),
			};
		}
		const parts = text.split(/\s+/);
		const group = normalizeRestraintGroupName(parts.shift());
		const asset = parts.shift() || "";
		return { group, asset, label: parts.join(" ").trim() };
	}

	function saveWornRestraintPreset(group, label, sender) {
		if (typeof InventoryGet !== "function" || !Player) {
			respondToOwner(sender, "BC inventory is not ready yet.");
			return;
		}
		const item = InventoryGet(Player, group);
		if (!item || !item.Asset) {
			respondToOwner(sender, `Nothing is currently worn in ${group}.`);
			return;
		}
		const preset = normalizeRestraintPreset({
			id: newId("restraint"),
			label: label || getRestraintItemLabel(item),
			group,
			asset: item.Asset.Name,
			color: clonePlain(item.Color),
			difficulty: Number(item.Difficulty) || 0,
			property: clonePlain(item.Property),
			craft: clonePlain(item.Craft),
			createdAt: Date.now(),
		});
		storeRestraintPreset(preset);
		addAudit("Worn restraint preset saved.", `${preset.label} (${preset.group}/${preset.asset})`, sender, "locks");
		saveSettings();
		uiState.message = `Saved restraint preset: ${preset.label}.`;
		respondToOwner(sender, `${buildRestraintListResponse()} Saved ${preset.label}.`);
	}

	function addRegularRestraintPreset(group, asset, label, sender) {
		const assetName = String(asset || "").trim();
		if (!assetName) {
			respondToOwner(sender, "Item asset name is missing.");
			return;
		}
		if (!assetExistsForGroup(group, assetName)) {
			respondToOwner(sender, "That item was not found. Wear it once and use Save Worn Slot if it is crafted or custom.");
			return;
		}
		const preset = normalizeRestraintPreset({
			id: newId("restraint"),
			label: label || assetName,
			group,
			asset: assetName,
			color: "Default",
			difficulty: 0,
			createdAt: Date.now(),
		});
		storeRestraintPreset(preset);
		addAudit("Regular restraint preset added.", `${preset.label} (${preset.group}/${preset.asset})`, sender, "locks");
		saveSettings();
		uiState.message = `Added restraint preset: ${preset.label}.`;
		respondToOwner(sender, `${buildRestraintListResponse()} Added ${preset.label}.`);
	}

	function applyRestraintPreset(selector, sender) {
		const preset = findRestraintPreset(selector);
		if (!preset) {
			respondToOwner(sender, "Restraint preset not found.");
			return;
		}
		const result = applyRestraintPresetToPlayer(preset);
		if (result.ok) {
			addAudit("Restraint preset applied.", `${preset.label} (${preset.group}/${preset.asset})`, sender, "locks");
			saveSettings();
			uiState.message = result.message;
			publishRestraintRoomMessage("applied", preset);
		}
		respondToOwner(sender, result.message);
	}

	function applyRestraintPresetToPlayer(preset) {
		if (!Player || typeof InventoryWear !== "function") {
			return { ok: false, message: "BC inventory is not ready yet." };
		}
		try {
			if (typeof InventoryRemove === "function") InventoryRemove(Player, preset.group, false);
			InventoryWear(
				Player,
				preset.asset,
				preset.group,
				preset.color === undefined ? "Default" : clonePlain(preset.color),
				Number(preset.difficulty) || 0,
				-1,
				clonePlain(preset.craft)
			);
			const item = typeof InventoryGet === "function" ? InventoryGet(Player, preset.group) : null;
			if (!item || !item.Asset || item.Asset.Name !== preset.asset) {
				return { ok: false, message: `Could not apply ${preset.label}. The item may not be available on this account.` };
			}
			if (preset.property) item.Property = clonePlain(preset.property);
			refreshPlayerItemGroup(preset.group);
			return { ok: true, message: `Applied ${preset.label}.` };
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not apply restraint preset`, error);
			return { ok: false, message: `Could not apply ${preset.label}.` };
		}
	}

	function removeRestraintGroup(group, sender) {
		if (!Player || typeof InventoryRemove !== "function") {
			respondToOwner(sender, "BC inventory is not ready yet.");
			return;
		}
		try {
			InventoryRemove(Player, group, false);
			refreshPlayerItemGroup(group);
			addAudit("Restraint slot removed.", group, sender, "locks");
			saveSettings();
			uiState.message = `${group} removed.`;
			respondToOwner(sender, `${group} removed.`);
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not remove restraint group`, error);
			respondToOwner(sender, `Could not remove ${group}.`);
		}
	}

	function deleteRestraintPreset(selector, sender) {
		const index = Number(selector);
		if (!index || index < 1 || index > settings.restraints.presets.length) {
			respondToOwner(sender, "Restraint preset not found.");
			return;
		}
		const removed = settings.restraints.presets.splice(index - 1, 1)[0];
		addAudit("Restraint preset deleted.", removed ? removed.label : String(index), sender, "locks");
		saveSettings();
		uiState.message = "Restraint preset deleted.";
		respondToOwner(sender, buildRestraintListResponse());
	}

	function storeRestraintPreset(preset) {
		if (!preset) return;
		settings.restraints.presets.push(preset);
		settings.restraints.presets = settings.restraints.presets
			.map(normalizeRestraintPreset)
			.filter(Boolean)
			.slice(-RESTRAINT_PRESET_LIMIT);
	}

	function findRestraintPreset(selector) {
		const index = Number(selector);
		const presets = settings.restraints.presets || [];
		if (index > 0 && presets[index - 1]) return presets[index - 1];
		return presets.find((preset) => preset.id === selector) || null;
	}

	function buildRestraintListResponse() {
		const presets = settings.restraints.presets || [];
		if (!presets.length) return "Restraints: none saved.";
		const list = presets
			.slice(0, RESTRAINT_PRESET_LIMIT)
			.map((preset, index) => `#${index + 1} ${fitText(preset.label, 26)} (${preset.group})`)
			.join("; ");
		return `Restraints: ${list}`;
	}

	function getRestraintItemLabel(item) {
		if (!item || !item.Asset) return "Saved restraint";
		if (item.Craft && item.Craft.Name) return item.Craft.Name;
		return item.Asset.Description || item.Asset.Name || "Saved restraint";
	}

	function assetExistsForGroup(group, assetName) {
		if (typeof AssetGet !== "function" || !Player) return true;
		try {
			return Boolean(AssetGet(Player.AssetFamily || "Female3DCG", group, assetName));
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not validate restraint asset`, error);
			return true;
		}
	}

	function refreshPlayerItemGroup(group) {
		if (!Player) return;
		try {
			if (typeof CharacterRefresh === "function") CharacterRefresh(Player, false);
			if (typeof ChatRoomCharacterItemUpdate === "function") {
				ChatRoomCharacterItemUpdate(Player, group);
			} else if (typeof ChatRoomCharacterUpdate === "function") {
				ChatRoomCharacterUpdate(Player);
			}
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not sync restraint update`, error);
		}
	}

	function publishRestraintRoomMessage(kind, preset) {
		if (kind !== "applied" || !preset) return;
		const name = getPlayerDisplayName();
		publishClubEmote(`*The Club fastens ${fitText(preset.label, 36)} onto ${name}; correction is now exactly where the owner wants it.`);
	}

	function publishClubEmote(message) {
		if (!isPlayerInChatRoom() || typeof ServerSend !== "function" || !Player || !message) return;
		try {
			const dictionary = typeof DictionaryBuilder !== "undefined"
				? new DictionaryBuilder().sourceCharacter(Player).build()
				: undefined;
			const data = {
				Content: message,
				Type: "Emote",
			};
			if (dictionary) data.Dictionary = dictionary;
			ServerSend("ChatRoomChat", data);
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not publish club emote`, error);
		}
	}

	function handleTokenCommand(args, sender) {
		const action = (args.shift() || "list").toLowerCase();
		if (action === "grant" || action === "add") {
			const label = (args.shift() || "permission").toLowerCase();
			const minutes = clampNumber(Number(args.shift()) || 10, 1, 240);
			const token = {
				id: newId("token"),
				label,
				createdAt: Date.now(),
				createdBy: sender,
				expiresAt: Date.now() + minutes * 60000,
			};
			settings.tokens.push(token);
			settings.tokens = settings.tokens.slice(-12);

			if (label === "escape" || label === "ubc" || label === "ultrabc") {
				settings.ultraBcEscapeToolsLocked = false;
				settings.ultraBcAutoRelockAt = token.expiresAt;
				syncUltraBcNoEscape(false);
			}

			addAudit("Permission token granted.", `${label} for ${minutes} minutes`, sender);
			saveSettings();
			uiState.message = `${label} token granted.`;
			respondToOwner(sender, `Token ${tokenIndex(token)} granted: ${label} for ${minutes} minutes.`);
			return;
		}

		if (action === "revoke" || action === "remove") {
			const token = findToken(args.shift());
			if (!token) {
				respondToOwner(sender, "Token not found.");
				return;
			}
			settings.tokens = settings.tokens.filter((item) => item.id !== token.id);
			if (isEscapeToken(token) && settings.ultraBcAutoRelockAt === token.expiresAt) {
				settings.ultraBcAutoRelockAt = 0;
				settings.ultraBcEscapeToolsLocked = true;
				syncUltraBcNoEscape(true);
			}
			addAudit("Permission token revoked.", token.label, sender);
			saveSettings();
			uiState.message = "Permission token revoked.";
			respondToOwner(sender, `Token ${tokenIndex(token)} revoked.`);
			return;
		}

		if (action === "clear") {
			settings.tokens = [];
			settings.ultraBcAutoRelockAt = 0;
			addAudit("Permission tokens cleared.", "", sender);
			saveSettings();
			uiState.message = "Permission tokens cleared.";
			respondToOwner(sender, "All tokens cleared.");
			return;
		}

		respondToOwner(sender, `${getActiveTokens().length} active tokens.`);
	}

	function buildOwnerStatus() {
		const scene = SCENE_MODES[settings.sceneMode] || SCENE_MODES.none;
		const ubc = settings.ultraBcEscapeToolsLocked ? "UltraBC locked" : "UltraBC allowed";
		const wardrobe = getWardrobeCommandStatusText().replace("Wardrobe command: ", "wardrobe ");
		const tasks = settings.tasks.filter((task) => !task.done).length;
		const tokens = getActiveTokens().length;
		const restraintCount = settings.restraints.presets.length;
		return `${scene.name}; ${ubc}; ${wardrobe}; ${tasks} open tasks; ${tokens} active tokens; ${restraintCount} saved restraints. ${buildTrainingStatusLine()} ${buildRpArousalStatusLine()}`;
	}

	function respondToOwner(senderNumber, message) {
		if (!senderNumber || !message) return;
		try {
			if (typeof ServerSend === "function" && isPlayerInChatRoom()) {
				ServerSend("ChatRoomChat", {
					Content: "UltimateSubResponse",
					Type: "Hidden",
					Target: senderNumber,
					Dictionary: [
						{ Tag: "UltimateSubMessage", Text: `[Ultimate Sub] ${message}` },
					],
				});
				ServerSend("ChatRoomChat", {
					Content: `[Ultimate Sub] ${message}`,
					Type: "Whisper",
					Target: senderNumber,
				});
				return;
			}
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not whisper owner`, error);
		}

		try {
			if (typeof ChatRoomSendLocal === "function") {
				ChatRoomSendLocal(`[Ultimate Sub] ${message}`, undefined, senderNumber);
			}
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not send local response`, error);
		}
	}

	function normalizeAuditEntry(entry) {
		const normalized = entry && typeof entry === "object" ? entry : {};
		const action = String(normalized.action || "Log entry");
		const detail = String(normalized.detail || "");
		return {
			time: Number(normalized.time) || Date.now(),
			actor: Number(normalized.actor) || 0,
			action,
			detail,
			category: normalizeAuditCategory(normalized.category) || categorizeAuditAction(action, detail),
		};
	}

	function normalizeAuditCategory(category) {
		const value = String(category || "").toLowerCase();
		return AUDIT_FILTERS.some((filter) => filter.id === value && value !== "all") ? value : "";
	}

	function categorizeAuditAction(action, detail) {
		const text = `${action || ""} ${detail || ""}`.toLowerCase();
		if (text.includes("rp arousal") || text.includes("silent rp") || text.includes("rp emote")) return "rp";
		if (text.includes("training") || text.includes("honorific") || text.includes("scene") || text.includes("posture")) return "training";
		if (text.includes("task")) return "tasks";
		if (text.includes("token")) return "owner";
		if (text.includes("ultrabc") || text.includes("wardrobe") || text.includes("restraint") || text.includes("escape tools") || text.includes("escape")) return "locks";
		if (text.includes("unauthorized") || text.includes("ignored") || text.includes("blocked") || text.includes("denied")) return "security";
		if (text.includes("emergency") || text.includes("expired") || text.includes("defaults") || text.includes("restored")) return "system";
		return "owner";
	}

	function addAudit(action, detail, actor, category) {
		const entry = normalizeAuditEntry({
			time: Date.now(),
			actor: actor || 0,
			action,
			detail: detail || "",
			category,
		});
		settings.auditLog.push(entry);
		settings.auditLog = settings.auditLog.slice(-AUDIT_LOG_LIMIT);
	}

	function cleanupTimedState() {
		let changed = false;
		const beforeTokens = settings.tokens.length;
		settings.tokens = settings.tokens.filter((token) => token.expiresAt > Date.now());
		if (beforeTokens !== settings.tokens.length) changed = true;

		if (settings.ultraBcAutoRelockAt && settings.ultraBcAutoRelockAt <= Date.now()) {
			settings.ultraBcAutoRelockAt = 0;
			settings.ultraBcEscapeToolsLocked = true;
			syncUltraBcNoEscape(true);
			addAudit("Escape token expired.", "UltraBC escape tools relocked.");
			changed = true;
		}

		if (beforeTokens !== settings.tokens.length) {
			addAudit("Expired tokens cleared.", "");
		}

		if (changed) {
			saveSettings();
		}
	}

	function getActiveTokens() {
		return settings.tokens.filter((token) => token.expiresAt > Date.now());
	}

	function hasActiveWardrobeToken() {
		return getActiveTokens().some(isWardrobeToken);
	}

	function findTask(selector) {
		const index = Number(selector);
		const openTasks = settings.tasks.filter((task) => !task.done);
		if (index > 0 && openTasks[index - 1]) return openTasks[index - 1];
		return settings.tasks.find((task) => task.id === selector) || null;
	}

	function findToken(selector) {
		const index = Number(selector);
		const activeTokens = getActiveTokens();
		if (index > 0 && activeTokens[index - 1]) return activeTokens[index - 1];
		return settings.tokens.find((token) => token.id === selector) || null;
	}

	function taskIndex(task) {
		return Math.max(1, settings.tasks.filter((item) => !item.done).indexOf(task) + 1);
	}

	function tokenIndex(token) {
		return Math.max(1, getActiveTokens().indexOf(token) + 1);
	}

	function isEscapeToken(token) {
		return ["escape", "ubc", "ultrabc"].includes(String(token.label || "").toLowerCase());
	}

	function isWardrobeToken(token) {
		return ["wardrobe", "wrobe", "clothes", "clothing"].includes(String(token.label || "").toLowerCase());
	}

	function newId(prefix) {
		return `${prefix}-${Date.now().toString(36)}-${Math.floor(Math.random() * 9999).toString(36)}`;
	}

	function clampNumber(value, min, max) {
		return Math.max(min, Math.min(max, value));
	}

	function formatTime(value) {
		const date = new Date(value);
		if (Number.isNaN(date.getTime())) return "unknown";
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		return `${hours}:${minutes}`;
	}

	function fitText(value, maxLength) {
		const text = String(value || "");
		return text.length > maxLength ? `${text.slice(0, Math.max(0, maxLength - 3))}...` : text;
	}

	function capitalize(value) {
		const text = String(value || "");
		return text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : "";
	}

	function nextCycleValue(values, current) {
		const index = values.indexOf(current);
		return values[(index + 1 + values.length) % values.length];
	}

	function getRpArousalModeDisplay(mode) {
		if (mode === "ownedPair") return "Owned Pair";
		if (mode === "everyone") return "Everyone";
		if (mode === "off") return "Off";
		return "Cycle";
	}

	function normalizeRpArousalMode(value) {
		const lower = String(value || "").toLowerCase();
		if (["off", "none", "disable", "disabled"].includes(lower)) return "off";
		if (["owned", "pair", "ownedpair", "owner", "ownerpair"].includes(lower)) return "ownedPair";
		if (["everyone", "all", "room", "anyone"].includes(lower)) return "everyone";
		return "";
	}

	function normalizeRpTargetStrength(value) {
		const lower = String(value || "").toLowerCase();
		return RP_TARGET_STRENGTHS.includes(lower) ? lower : "";
	}

	function normalizeRpPerformerStrength(value) {
		const lower = String(value || "").toLowerCase();
		return RP_PERFORMER_STRENGTHS.includes(lower) ? lower : "";
	}

	function getRpTargetStrengthMultiplier() {
		if (settings.rpArousal.targetStrength === "light") return 0.65;
		if (settings.rpArousal.targetStrength === "strong") return 1.45;
		return 1;
	}

	function getRpPerformerStrengthMultiplier() {
		if (settings.rpArousal.performerStrength === "off") return 0;
		if (settings.rpArousal.performerStrength === "normal") return 1;
		return 0.5;
	}

	function escapeRegExp(value) {
		return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}

	function isPlayerInChatRoom() {
		return typeof ServerPlayerIsInChatRoom === "function" && ServerPlayerIsInChatRoom();
	}

	function getRoomCharacter(memberNumber) {
		const numericMemberNumber = Number(memberNumber);
		if (!numericMemberNumber || typeof ChatRoomCharacter === "undefined" || !Array.isArray(ChatRoomCharacter)) return null;
		return ChatRoomCharacter.find((character) => character && character.MemberNumber === numericMemberNumber) || null;
	}

	function registerModSdkApi() {
		if (modApi) return true;

		const sdk = getModSdk();
		if (!sdk) {
			beacon("modsdk-not-ready");
			return false;
		}

		modApi = sdk.registerMod({
			name: MOD_ID,
			fullName: MOD_NAME,
			version: MOD_VERSION,
		}, { allowReplace: true });
		beacon("modsdk-registered");
		return true;
	}

	function getModSdk() {
		if (window.bcModSdk && typeof window.bcModSdk.registerMod === "function") {
			return window.bcModSdk;
		}

		if (typeof bcModSDK !== "undefined" && bcModSDK && typeof bcModSDK.registerMod === "function") {
			return bcModSDK;
		}

		return null;
	}

	function installModSdkHooks(attempt = 0) {
		if (!registerModSdkApi()) {
			if (attempt < 60) setTimeout(() => installModSdkHooks(attempt + 1), 1000);
			return;
		}

		safeHookFunction("DrawCharacter", 20, (args, next) => {
			const result = next(args);
			drawTrainingStatusHeel(args[0], args[1], args[2], args[3]);
			return result;
		});

		safeHookFunction("ChatRoomMessage", 5, (args, next) => {
			if (handleRpArousalSyntheticActivity(args[0])) return;
			if (captureTrainingPresence(args[0])) return;
			if (ignoreLegacyStrikeAlert(args[0])) return;
			if (captureRemoteResponse(args[0])) return;
			if (handleOwnerCommand(args[0])) return;
			observeTrainingActionMessage(args[0]);
			observeRpArousalEmote(args[0]);
			return next(args);
		});

		safeHookFunction("ChatRoomClick", 200, (args, next) => {
			if (shouldBlockUltraBcEscapeTools() && isUltraBcFreeButtonClick()) {
				blockUltraBcEscapeOperation("Blocked UltraBC FREE button.");
				return;
			}

			if (shouldBlockTrainingActionTaskClick()) {
				blockTrainingActionTask("Finish the current Training task first.");
				return;
			}

			return next(args);
		});

		safeHookFunction("PandoraPrisonClick", 200, (args, next) => {
			if (shouldBlockUltraBcEscapeTools() && isUltraBcFreeButtonClick()) {
				blockUltraBcEscapeOperation("Blocked UltraBC FREE button.");
				return;
			}

			return next(args);
		});

		safeHookFunction("PhotographicClick", 200, (args, next) => {
			if (shouldBlockUltraBcEscapeTools() && isUltraBcFreeButtonClick()) {
				blockUltraBcEscapeOperation("Blocked UltraBC FREE button.");
				return;
			}

			return next(args);
		});

		safeHookFunction("CellClick", 200, (args, next) => {
			if (shouldBlockUltraBcEscapeTools() && isUltraBcFreeButtonClick()) {
				blockUltraBcEscapeOperation("Blocked UltraBC FREE button.");
				return;
			}

			return next(args);
		});

		safeHookFunction("ChatRoomSendChat", 200, (args, next) => {
			if (shouldBlockUltraBcEscapeTools() && isBlockedUltraBcEscapeCommandInput()) {
				blockUltraBcEscapeOperation("Blocked UltraBC escape command.");
				clearChatInput();
				return;
			}

			if (shouldBlockWardrobeCommand() && isBlockedWardrobeCommandInput()) {
				blockWardrobeCommand("Blocked wardrobe command.");
				clearChatInput();
				return;
			}

			if (shouldBlockTrainingHonorificInput()) {
				blockTrainingHonorificSpeech();
				clearChatInput();
				return;
			}

			if (shouldBlockTrainingActionTaskInput()) {
				blockTrainingActionTask("Finish the current Training task first.");
				clearChatInput();
				return;
			}

			return next(args);
		});

		safeHookFunction("ServerSend", 1, (args, next) => {
			if (shouldBlockUltraBcEscapeTools() && args[0] === "ChatRoomChat" && isUltraBcEscapeLaserMessage(args[1])) {
				blockUltraBcEscapeOperation("Blocked UltraBC escape message.");
				return;
			}

			return next(args);
		});

		safeHookFunction("CharacterReleaseTotal", 1, (args, next) => {
			if (shouldHardBlockPlayerRelease(args[0])) {
				blockUltraBcEscapeOperation("Blocked UltraBC total release.");
				return;
			}

			return next(args);
		});

		safeHookFunction("CharacterRelease", 1, (args, next) => {
			if (shouldHardBlockPlayerRelease(args[0])) {
				blockUltraBcEscapeOperation("Blocked UltraBC untie.");
				return;
			}

			return next(args);
		});

		safeHookFunction("InformationSheetRun", 20, (args, next) => {
			if (remotePanel.active) {
				drawRemoteOwnerPanel();
				return;
			}

			const result = next(args);
			drawProfileOwnerButtonIfNeeded();
			return result;
		});

		safeHookFunction("InformationSheetClick", 20, (args, next) => handleInformationSheetClick(args, next));

		safeHookFunction("InformationSheetExit", 20, (args, next) => {
			if (remotePanel.active) {
				closeRemoteOwnerPanel();
				return;
			}

			return next(args);
		});

		beacon("modsdk-hooks-installed");
	}

	function safeHookFunction(functionName, priority, handler) {
		try {
			modApi.hookFunction(functionName, priority, (args, next) => {
				let nextWasCalled = false;
				const guardedNext = (nextArgs) => {
					nextWasCalled = true;
					return next(nextArgs);
				};

				try {
					return handler(args, guardedNext);
				} catch (error) {
					console.warn(`[${MOD_NAME}] Hook ${functionName} failed`, error);
					if (!nextWasCalled) return next(args);
					throw error;
				}
			});
			beacon(`hooked-${functionName}`);
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not hook ${functionName}`, error);
			beacon(`hook-failed-${functionName}`);
		}
	}

	function registerExtensionMenu() {
		beacon("register-attempt");
		if (typeof PreferenceRegisterExtensionSetting !== "function") {
			beacon("registry-not-ready");
			log("Preference extension registry is not ready yet.");
			return false;
		}

		const setting = {
			Identifier: MOD_ID,
			ButtonText: MOD_NAME,
			load: () => {
				uiState.message = "";
			},
			run: drawMenu,
			click: handleClick,
			exit: () => true,
			unload: () => {
				uiState.message = "";
			},
		};

		if (
			typeof PreferenceExtensionsSettings !== "undefined"
			&& PreferenceExtensionsSettings
			&& PreferenceExtensionsSettings[MOD_ID]
		) {
			PreferenceExtensionsSettings[MOD_ID] = setting;
			if (
				typeof PreferenceExtensionsCurrent !== "undefined"
				&& PreferenceExtensionsCurrent
				&& PreferenceExtensionsCurrent.Identifier === MOD_ID
			) {
				PreferenceExtensionsCurrent = setting;
			}
			beacon("replaced-existing-registration");
			return true;
		}

		PreferenceRegisterExtensionSetting(setting);

		if (
			typeof PreferenceExtensionsSettings !== "undefined"
			&& PreferenceExtensionsSettings
			&& PreferenceExtensionsSettings[MOD_ID]
		) {
			beacon("registered");
		} else {
			beacon("register-returned-without-entry");
		}

		return true;
	}

	function refreshExtensionsListIfOpen() {
		beacon("refresh-check");
		if (
			typeof PreferenceSubscreen !== "undefined"
			&& PreferenceSubscreen
			&& (PreferenceSubscreen.name === "Extensions" || PreferenceSubscreen === "Extensions")
			&& typeof PreferenceOpenSubscreen === "function"
		) {
			beacon("refresh-open-extensions");
			PreferenceOpenSubscreen("Extensions");
		}
	}

	function startBackgroundSync() {
		if (window.UltimateSubIntervalId) {
			clearInterval(window.UltimateSubIntervalId);
		}

		window.UltimateSubIntervalId = setInterval(() => {
			cleanupTimedState();
			enforceTrainingState();
			pruneTrainingPresence();
			broadcastTrainingPresence(false);
			if (shouldBlockUltraBcEscapeTools()) syncUltraBcNoEscape(true);
		}, 3000);
	}

	function applyStartupTrainingDefaultsReset() {
		if (!startupTrainingDefaultsReset) return;
		settings.sceneMode = "none";
		settings.ultraBcEscapeToolsLocked = false;
		settings.ultraBcAutoRelockAt = 0;
		settings.wardrobeCommandLocked = false;
		settings.training = { ...defaultTrainingSettings };
		syncUltraBcNoEscape(false);
		addAudit("Training defaults reset.", "All Training toggles now start off until the owner enables them.");
		saveSettings();
		uiState.message = "Training defaults reset to off.";
		startupTrainingDefaultsReset = false;
	}

	function shouldApplyVersionSafetyReset() {
		const storedVersion = getStoredUltimateSubVersion();
		return !storedVersion || compareVersionStrings(storedVersion, VERSION_SAFETY_RESET_BEFORE) < 0;
	}

	function getStoredUltimateSubVersion() {
		try {
			return localStorage.getItem(VERSION_STORAGE_KEY) || "";
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not read last loaded version`, error);
			return "";
		}
	}

	function markUltimateSubVersionLoaded() {
		try {
			localStorage.setItem(VERSION_STORAGE_KEY, MOD_VERSION);
		} catch (error) {
			console.warn(`[${MOD_NAME}] Could not save last loaded version`, error);
		}
	}

	function applyStartupVersionSafetyReset() {
		if (!startupVersionSafetyReset) {
			markUltimateSubVersionLoaded();
			return;
		}

		const hadActiveControls = hasActiveStartupControls();
		if (hadActiveControls) {
			settings.sceneMode = "none";
			settings.ultraBcEscapeToolsLocked = false;
			settings.ultraBcAutoRelockAt = 0;
			settings.wardrobeCommandLocked = false;
			settings.training = {
				...defaultTrainingSettings,
				defaultsVersion: TRAINING_DEFAULTS_VERSION,
			};
			syncUltraBcNoEscape(false);
			addAudit("Version update safety reset.", "Owner locks and Training controls were set off after loading a new Ultimate Sub version.", 0, "system");
			uiState.message = "Update safety reset: locks and Training controls are off.";
			saveSettings();
		}

		markUltimateSubVersionLoaded();
		startupVersionSafetyReset = false;
	}

	function applyStartupSafeLiveDefaults() {
		const hadActiveControls = hasActiveStartupControls();
		settings.sceneMode = "none";
		settings.ultraBcEscapeToolsLocked = false;
		settings.ultraBcAutoRelockAt = 0;
		settings.wardrobeCommandLocked = false;
		settings.training = normalizeTrainingSettings({
			...settings.training,
			forceKneel: false,
			lockUltraBc: false,
			lockWardrobe: false,
			honorific: "off",
			honorificStrikes: 0,
			lastStrikeAlertCount: 0,
			announceStart: false,
			appliedUltraBcLock: false,
			appliedWardrobeLock: false,
			defaultsVersion: TRAINING_DEFAULTS_VERSION,
		}, false);
		syncUltraBcNoEscape(false);

		if (hadActiveControls) {
			addAudit("Startup live controls reset.", "Training, kneel, UltraBC, wardrobe, honorific, and strikes start off on every fresh load.", 0, "system");
			uiState.message = "Startup safety: live controls are off.";
		}
		saveSettings();
		broadcastTrainingPresence(true);
	}

	function compareVersionStrings(left, right) {
		const leftParts = String(left || "").split(".").map((part) => Number(part) || 0);
		const rightParts = String(right || "").split(".").map((part) => Number(part) || 0);
		const length = Math.max(leftParts.length, rightParts.length);
		for (let index = 0; index < length; index += 1) {
			const difference = (leftParts[index] || 0) - (rightParts[index] || 0);
			if (difference !== 0) return difference;
		}
		return 0;
	}

	function hasActiveStartupControls() {
		return settings.sceneMode !== "none"
			|| settings.ultraBcEscapeToolsLocked === true
			|| settings.ultraBcAutoRelockAt > 0
			|| settings.wardrobeCommandLocked === true
			|| settings.training.forceKneel === true
			|| settings.training.lockUltraBc === true
			|| settings.training.lockWardrobe === true
			|| settings.training.honorific !== "off"
			|| settings.training.honorificStrikes > 0
			|| settings.training.appliedUltraBcLock === true
			|| settings.training.appliedWardrobeLock === true;
	}

	function enforceTrainingState() {
		if (!isTrainingSceneActive()) return;

		completeTrainingActionTaskIfSatisfied("required pose detected");
		const activeActionTask = getCurrentBlockingTrainingTask();
		let changed = false;
		if (settings.training.lockUltraBc && !settings.ultraBcEscapeToolsLocked) {
			settings.training.appliedUltraBcLock = true;
			settings.ultraBcEscapeToolsLocked = true;
			settings.ultraBcAutoRelockAt = 0;
			syncUltraBcNoEscape(true);
			changed = true;
		}

		if (settings.training.lockWardrobe && !settings.wardrobeCommandLocked) {
			settings.training.appliedWardrobeLock = true;
			settings.wardrobeCommandLocked = true;
			changed = true;
		}

		if (settings.training.forceKneel && (!activeActionTask || activeActionTask.action !== "stand")) {
			setPlayerKneelingFromOwner(true, 0);
		}

		completeTrainingActionTaskIfSatisfied("required pose detected");

		if (changed) {
			addAudit("Training enforcement restored.", "");
			saveSettings();
		}
	}

	function bootWhenReady(attempt = 0) {
		if (attempt === 0) beacon("boot-start");
		if (window.UltimateSubLoaded && window.UltimateSubVersion === MOD_VERSION) {
			beacon("already-loaded-flag");
			log("Already loaded.");
			refreshExtensionsListIfOpen();
			return;
		}

		if (registerExtensionMenu()) {
			window.UltimateSubLoaded = true;
			window.UltimateSubVersion = MOD_VERSION;
			beacon("boot-registered");
			installModSdkHooks();
			refreshExtensionsListIfOpen();
			applyStartupTrainingDefaultsReset();
			applyStartupVersionSafetyReset();
			applyStartupSafeLiveDefaults();
			startBackgroundSync();
			notify("Ultimate Sub loaded. Check Profile > Preferences > Extensions.");
			return;
		}

		if (attempt < 60) {
			setTimeout(() => bootWhenReady(attempt + 1), 1000);
		} else {
			notify("Ultimate Sub could not load. Open Bondage Club first, then run the bookmark again.");
		}
	}

	bootWhenReady();
})();
