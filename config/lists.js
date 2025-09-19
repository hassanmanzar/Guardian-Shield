
const reliableSources = ['reuters.com', 'apnews.com', 'bbc.com', 'pbs.org', 'npr.org', 'wsj.com', 'bloomberg.com', 'forbes.com', 'economist.com', 'nytimes.com', 'washingtonpost.com', 'c-span.org', 'abcnews.go.com', 'cbsnews.com', 'nbcnews.com', 'usatoday.com', 'theguardian.com', 'theatlantic.com', 'politico.com', 'axios.com', 'newsweek.com', 'businessinsider.com', 'time.com', 'espn.com', 'ft.com', 'newyorker.com', 'latimes.com', 'cnbc.com', 'thehill.com'];
const unreliableSources = ['infowars.com', 'breitbart.com', 'dailycaller.com', 'thegatewaypundit.com', 'nationalenquirer.com', 'oann.com', 'newsmax.com', 'dailymail.co.uk', 'the-sun.com', 'nypost.com', 'westernjournal.com', 'theblaze.com', 'judicialwatch.org', 'naturalnews.com', 'wnd.com', 'theepochtimes.com', 'dailywire.com', 'rt.com', 'sputniknews.com'];
const sensationalistWords = [
    'shocking', 'bombshell', 'explosive', 'secret', 'exposed',
    'miracle', 'unbelievable', 'drastic', 'game-changer', 'cover-up',
    'stunning', 'mind-blowing', 'outrageous', 'dramatic', 'horrifying',
    'terrifying', 'astonishing', 'jaw-dropping', 'incredible', 'sensational',
    'scandalous', 'controversial', 'devastating', 'catastrophic', 'crisis',
    'urgent', 'exclusive', 'breaking', 'revealed', 'hidden',
    'truth', 'warning', 'danger', 'alarming', 'frightening',
    'epic', 'massive', 'huge', 'colossal', 'ultimate',
    'revolutionary', 'life-changing', 'must-see', 'unmissable', 'bizarre',
    'weird', 'crazy', 'insane', 'wild', 'shockwave',
    'firestorm', 'meltdown', 'rage', 'fury', 'panic',
    'chaos', 'disaster', 'tragedy', 'nightmare', 'triumph',
    'victory', 'hero', 'villain', 'evil', 'good',
    'battle', 'war', 'fight', 'clash', 'showdown', 'confrontation',
    'unprecedented', 'historic', 'groundbreaking', 'pivotal', 'crucial',
    'vital', 'essential', 'critical', 'decisive', 'momentous',
    'epochal', 'transformative', 'radical', 'extreme', 'intense',
    'fierce', 'brutal', 'savage', 'vicious', 'ruthless',
    'merciless', 'deadly', 'fatal', 'lethal', 'grim',
    'bleak', 'dire', 'grave', 'serious', 'profound',
    'deep', 'vast', 'immense', 'enormous', 'gigantic',
    'titanic', 'monumental', 'legendary', 'mythic', 'iconic',
    'classic', 'timeless', 'eternal'
];

module.exports = {
    reliableSources,
    unreliableSources,
    sensationalistWords
};
