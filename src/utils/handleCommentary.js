function handleCommentary(freeHit, ballOutcome) {
  const commentaryData = {
    0: [
      "With pinpoint accuracy, the bowler delivers another tight delivery, leaving the batsman no room to score. It's a dot ball, and the rising pressure is clearly beginning to show.",
      "A well-executed delivery combined with sharp field placements leaves the batsman with no scoring options. It's another dot ball, reflecting the team's disciplined and strategic setup.",
      "That was a textbook delivery, angled perfectly and hitting the right length. The batsman had no space or timing to maneuver a shot another dot ball on the board.",
      "Looking to break free, the batsman charges forward but only manages to push it to a waiting fielder. Yet another dot ball builds the pressure even further.",
      "The bowler holds his line tightly, and the batsman attempts a shot but finds only the infielders. A well-earned dot ball adds to the mounting scoreboard tension.",
      "Another delivery goes unscored as the bowler maintains his rhythm and control, spinning a web of pressure around the batsman. Dot ball again it’s a masterclass in economy.",
      "At this stage of the innings, each dot ball is gold. The bowler sticks to his plan, denying runs and steadily shifting momentum in favor of the fielding side.",
      "The batsman opts for caution, choosing to defend rather than risk a shot. It's a quiet ball, but a loud message from the bowler: no easy runs here.",
      "Perfect length delivery just short enough to deny the drive, but full enough to tempt. The batsman blocks it back to the bowler. Dot ball and more control.",
      "This has been an incredible over so far. The bowler continues his tidy spell, and with fielders in the right spots, another dot ball is added to the tally."
    ],
    1: [
      "With great placement, the batsman finds the gap between fielders and confidently runs for a quick single. The timing and precision were perfect, allowing him to steal a single without hesitation.",
      "The batsmen communicate flawlessly, timing their run to perfection. It’s a well-judged single, with a clear call and quick movement, ensuring they make it comfortably despite the close fielding.",
      "Using soft hands, the batsman pushes the ball gently into the gap, making it look effortless. It’s a textbook example of placement, and the batsmen complete the run with ease.",
      "The batsman is light on his feet, darting quickly for a single after gently tapping the ball. He’s swift between the wickets, and the fielders can’t get to it in time.",
      "With a deft touch, the batsman guides the ball into the off-side, finding the perfect gap. It’s a well-executed stroke that ensures a simple and effective single for the team.",
      "The batsmen are in sync, running well between the wickets. Their quick exchanges allow them to rotate the strike and keep the scoreboard ticking. It’s sharp and smart cricket running here.",
      "A quick and sharp nudge behind square finds the batsman in perfect position to sprint for a single. It’s a well-executed move, and the pair executes it with speed and coordination.",
      "With excellent awareness of the field and situation, the batsman seizes the opportunity to pinch a quick single. It’s a smart piece of cricket, showing sharp cricketing intelligence in real-time.",
      "With a confident push, the batsman places the ball into the infield, finding the gap. The quick response from both batsmen ensures the single is completed with ease, keeping the pressure on the bowler.",
      "The batsman takes a well-judged single, keeping the scoreboard moving while denying the bowler a clean over. It’s a smart piece of running, maintaining pressure and momentum in the game."
    ],
    2: [
      "Both batsmen show excellent coordination and sprinting speed as they run hard between the wickets. The quick call and sharp running bring them back comfortably for a well-earned two runs.",
      "With a well-executed push, the batsman places the ball into the gap, and the duo takes full advantage, racing for two. The fielders give chase, but it's an easy double.",
      "The batsman places the ball perfectly into the gap, finding the open spaces. Though the fielders chase hard, the batsmen complete the second run easily, showing great judgment and running skills.",
      "After the ball is played into the gap, both batsmen turn on their heels without hesitation. Their quick reflexes and sharp calling ensure that they comfortably complete two runs.",
      "A well-timed shot doesn’t quite make it to the boundary, but the batsmen run hard and make the most of the opportunity, comfortably completing two runs without any pressure.",
      "With fantastic coordination and quick feet, the batsmen turn a single into a comfortable double. Their awareness of the field placements and smart calling helps them take full advantage of the situation.",
      "With a flick off the pads, the batsman places the ball just wide enough to allow for a second run. The pair is sharp and quick, taking advantage of every opportunity.",
      "The batsmen show great awareness of the field, noticing the gap in the outfield. With quick calling and excellent running, they successfully turn a potential single into a comfortable two.",
      "The batsmen sprint the first run hard, ensuring they get to the crease quickly, and with perfect coordination, they comfortably get back for the second run, showing great running between the wickets.",
      "The batsmen’s quick footwork and sharp calling are key to converting a potential single into two runs. They move efficiently between the wickets, ensuring the second run is well-earned and safe."
    ],
    3: [
      "The batsman places the ball perfectly, and it races past the fielder into the deep. With quick running and excellent communication, the batsmen manage to turn it into three runs.",
      "The batsmen display fantastic running and clear communication. They sprint hard between the wickets, turning what seemed like a two into a well-earned three, showing great teamwork and awareness.",
      "With a clever and controlled push into the deep, the batsmen don’t hesitate. They dash between the wickets, completing three runs with ease as the fielders struggle to cut them off.",
      "Spotting the gap, the batsmen take full advantage, running hard and quickly. Their hustle pays off as they complete three runs, showing impressive speed and tactical awareness between the wickets.",
      "A well-timed shot doesn't quite reach the boundary, but the batsmen's running makes up for it. They hustle between the wickets and manage to grab three valuable runs off the stroke.",
      "With great urgency, the batsmen run hard between the wickets, covering the ground quickly. Their effort ensures that a shot that could have been a two turns into a valuable three.",
      "The batsman places the ball with great precision, finding the gap. The running is quick and calculated, allowing them to comfortably take three runs before the fielders can react.",
      "The batsmen show aggressive intent, pushing for the third run with speed and efficiency. Their sharp calling and rapid movement ensure that they convert a two into a valuable three.",
      "With superb awareness of the field placements and fast reflexes, the batsmen sprint between the wickets. Their smart decision-making earns them three runs, adding pressure to the fielding side.",
      "A well-coordinated effort by the batsmen sees them running hard between the wickets. With excellent calling and sharp speed, they cover the ground quickly and secure three runs successfully."
    ],
    4: [
      "What a magnificent shot! The batsman hits it cleanly, and the ball races across the field with incredible pace, reaching the boundary in no time. Four runs off a brilliant stroke.",
      "Perfectly timed by the batsman! He finds the gap with precision, and the ball flows effortlessly past the fielders. There’s no stopping it; the boundary is secured with ease and elegance.",
      "An elegant and classy shot! The batsman drives with impeccable timing, and the ball travels gracefully towards the boundary, easily crossing the ropes. Four runs for a well-executed stroke.",
      "With an authoritative drive, the batsman finds the gap perfectly between fielders. The ball races towards the boundary, and the fielders can only watch as the batsman secures four runs.",
      "What a powerful stroke! The batsman launches the ball with immense power, sending it crashing towards the boundary. There’s no way the fielders can intercept this one four runs added to the total.",
      "A glorious shot from the batsman! The ball leaves the bat with perfect timing, racing across the grass towards the boundary. The fielders are left stranded as the ball reaches four effortlessly.",
      "With surgical precision, the batsman places the ball exactly where he wants it. He finds the gap in the field, and the ball speeds away for four valuable runs without a fielder in sight.",
      "A fantastic shot from the batsman, and there’s no stopping it! The ball flies past the fielders and rolls smoothly to the boundary. It’s four more runs added to the scorebook.",
      "An expertly executed shot! The batsman’s placement and timing are spot on as the ball races towards the boundary, just kissing the boundary line for four runs, a brilliant stroke of class.",
      "That’s pure class from the batsman! With a picture-perfect shot, he places the ball perfectly between fielders and the boundary. The ball races to the ropes for a seamless four runs."
    ],
    5: [
      "What a fantastic catch in the deep! The fielder timed his leap perfectly and grabbed the ball out of the air. The batsman is dismissed, and he has no choice but to walk back.",
      "What a catch! The fielder never looked uncertain, keeping his focus as the ball soared towards him. He makes no mistake, and that’s the end of the batsman's innings out!",
      "The batsman had intentions of going big, but his shot lacked the power. The fielder was in perfect position, and with a safe pair of hands, he takes the catch to end the threat.",
      "A brilliant, sharp catch taken at slip! The ball came quickly, but the fielder was right there, hands steady. The bowler has his reward, and the batsman is sent packing.",
      "The batsman misjudges the shot, and it flies straight to the waiting fielder. Without any hesitation, the catch is taken comfortably, and the batsman is dismissed cheaply.",
      "The batsman mistimes the shot, sending the ball high into the air. It’s a straightforward catch, and the fielder is under no pressure as he takes it. The batsman has to depart.",
      "An absolutely stunning diving catch! The fielder threw himself to the ground and managed to grab the ball inches off the ground. It’s a game-changing moment, and the batsman is out.",
      "With a cool head under pressure, the fielder judges the high catch perfectly. He positions himself well and takes the catch comfortably. The batsman departs, and the fielding team celebrates.",
      "A simple, well-judged catch in the outfield is all it took. The batsman didn't hit it cleanly, and the fielder, with a steady hand, takes the catch. The batsman is out.",
      "The bowler lets out a loud cheer as the fielder takes a breathtaking catch. It’s a brilliant piece of fielding, and the batsman has to depart after being dismissed in style."
    ],
    6: [
      "That was an enormous hit! The batsman didn’t hold back, and the ball takes off like a rocket, sailing effortlessly over the boundary for a massive six runs.",
      "With a tremendous swing, the ball goes high into the air, soaring towards the boundary. The batsman’s power and timing are flawless six runs, and the crowd is on its feet!",
      "The batsman absolutely smashes the ball, sending it flying out of the park with a powerful stroke. The ball’s trajectory is unstoppable it’s six runs all the way!",
      "A perfect blend of power and timing! The batsman launches the ball with precision, and it disappears into the stands like it’s on a mission six runs, a mighty hit!",
      "With a resounding 'boom,' the ball is sent rocketing towards the boundary. The batsman has timed it perfectly, and the ball sails over the ropes for six stylish runs.",
      "A high, majestic shot! The batsman takes a full swing, and the ball sails handsomely over the boundary. There’s no stopping it six runs added in style.",
      "It’s a maximum! The batsman’s powerful strike sends the ball flying, and the bowler can only watch as it sails effortlessly over the boundary line for six runs.",
      "What a hit! The batsman launches the ball high into the sky, and it seems to go all the way to the moon before returning as six runs truly spectacular!",
      "The crowd goes wild as the batsman sends the ball crashing over the boundary. It’s a thunderous six that shakes the stadium, and the crowd is on their feet cheering.",
      "With a graceful flick of the wrist, the batsman sends the ball flying effortlessly over the fielders’ heads, and it cruises over the boundary for six runs what a beautiful shot!"
    ],
    7: [
      "The bowler delivers a perfect line, and the batsman is trapped in front of the stumps. The umpire raises his finger without hesitation it's LBW, and the batsman has to walk off.",
      "The ball crashes into the batsman’s pads with no doubt about its trajectory. The appeal is loud and convincing, and the umpire gives it out LBW plumb in front! The batsman has to go.",
      "The fielding side is up in arms, a loud appeal echoing across the ground. The ball hits the batsman in line, and after a brief pause, the umpire raises his finger LBW! Another wicket falls.",
      "It’s a textbook LBW decision! The ball pitches in line, hits the pads, and there’s no doubt in anyone’s mind. The umpire has no hesitation in raising his finger out LBW, the batsman departs.",
      "A fine delivery from the bowler, and the batsman falls victim to the leg before wicket trap. The ball strikes the pads, and the umpire’s finger goes up reward for the bowler's effort, and the batsman walks off.",
      "The batsman plays all around the delivery, misjudging the line completely. The ball hits the pads in front of the stumps, and the umpire signals LBW. The batsman’s innings comes to an abrupt end.",
      "The bowler delivers a perfect ball, hitting the batsman’s pads flush in front of the stumps. There’s no doubt it would have hit the stumps, and the umpire signals LBW. Another wicket for the bowler!",
      "The fielding side celebrates wildly as the umpire raises his finger for an LBW decision. The batsman is out, and the atmosphere is electric another wicket for the bowling team!",
      "The batsman fails to offer a shot to a full delivery, and the ball strikes the pads in front of the stumps. The umpire has no choice but to raise his finger LBW, and the batsman is out.",
      "The bowler gives a brilliant appeal, and after a brief moment of deliberation, the umpire raises his finger LBW! Another wicket falls, and the bowler has struck again with great precision."
    ],
    8: [
      "What a fantastic delivery! The ball is perfectly pitched, and it crashes into the stumps, shattering them into pieces. The batsman has no chance he's clean bowled and sent back to the pavilion.",
      "A brilliant delivery! The ball sneaks through the defenses of the batsman and crashes into the stumps, sending the bails flying. It's a textbook clean bowled, and the batsman has no response.",
      "The bowler has found the perfect line and length! The ball goes straight through the batsman’s defenses, hitting the stumps and sending the bails flying. Another wicket for the bowler clean bowled!",
      "What a peach of a delivery! The bowler delivers a perfect ball that completely outwits the batsman, sending the stumps flying as the ball crashes into them. The batsman is clean bowled.",
      "The batsman misjudges the line entirely! The ball swings or spins past him, hitting the stumps and uprooting them. The batsman has no chance, and he is sent back to the dressing room.",
      "Bowled him! The ball sneaks through and destroys the stumps. The bowler raises his arms in celebration as the batsman walks back to the dressing room, having been completely outfoxed.",
      "The ball crashes into the stumps with precision and power, sending the bails flying. It’s a fantastic delivery, and the batsman has no chance he’s bowled out cleanly.",
      "The ball goes right through the gap in the batsman’s defenses through the gate and onto the stumps. It’s a brilliant delivery from the bowler, and the batsman is completely bowled out.",
      "The batsman is beaten completely! The ball moves past his defenses, and the stumps are rattled. The bowler has bowled a perfect delivery, and he gets his well-deserved reward a clean bowled wicket.",
      "A perfect delivery from the bowler! The ball hits the stumps with force, uprooting them and sending the bails flying. The batsman is out clean bowled, and the fielding team erupts in celebration."
    ],
    9: [
      "In a flash, the wicketkeeper moves like lightning, whipping off the bails as the batsman is out of his crease. The stumping is quick and clinical, and the batsman is out.",
      "A moment of brilliance from the wicketkeeper! The batsman ventures too far down the pitch, and with perfect timing, the keeper dislodges the bails. The batsman is out stumped.",
      "The batsman steps out of his crease, attempting to attack, but misses the ball completely. The wicketkeeper is quick to take advantage, removing the bails in an instant stumped!",
      "The wicketkeeper shows off his fantastic reflexes with sharp glovework. The batsman steps out and is caught off guard before he knows it, the bails are off and he’s stumped.",
      "A great bit of bowling that draws the batsman out of his crease, and the wicketkeeper finishes the job with clinical precision, dislodging the bails. The batsman is stumped.",
      "A magical moment behind the stumps! The wicketkeeper reacts in an instant, and the stumps are shattered as the batsman is stumped in a moment of brilliance.",
      "The batsman charges down the track, but he’s too far out of his crease. The keeper is quick to take the bails off, leaving the batsman stranded stumped out!",
      "The wicketkeeper’s reflexes are spot on! As soon as the batsman steps out, the bails are off, and the batsman is out stumped in a flash!",
      "A well-disguised delivery from the bowler deceives the batsman, drawing him out of his crease. The keeper is alert and pounces, removing the bails in no time stumped!",
      "The batsman takes a risky chance, stepping out of his crease, but the keeper is too quick for him. The bails are off in an instant, and the batsman is out stumped!"
    ],
    10: [
      "What an incredible direct hit from the fielder! The throw is pinpoint accurate, and the batsman is caught well short of his crease. No chance for him to make his ground he’s run out!",
      "Brilliant fielding on display! The fielder gathers the ball quickly and makes a sharp, accurate throw to the stumps. The batsman is out of his ground run out!",
      "The fielder's reflexes are lightning quick! In one smooth motion, he gathers the ball and delivers a perfect throw to the stumps, resulting in a stunning run-out.",
      "A communication mix-up between the batsmen! One hesitates, and the fielding side seizes the opportunity, making a swift throw to the stumps to run the batsman out.",
      "A perfect throw to the stumps! The fielder is spot on, and the batsman is well short of the crease. There's no chance for him to make his ground he’s run out!",
      "Incredible awareness from the fielder! He spots the opportunity and makes a flawless throw to the stumps, executing the perfect run-out.",
      "A moment of hesitation from the batsmen, and the fielder makes them pay for it! The throw is swift and accurate, and the batsman is out by a mile run out!",
      "What a rocket throw from the deep! The fielder sends it to the keeper, who does the rest with quick reflexes, removing the bails and completing the run-out.",
      "The batsman takes a risky single, but the fielder reacts in an instant! The throw is accurate, and the batsman is short of his ground he’s run out.",
      "What a game-changing moment! The batsman is run out by the tiniest of margins his ground is not safe, and the fielding side takes full advantage. What a dramatic moment!"
    ],
    11: [
      "The bowler loses his line, sending the ball well outside the off-stump. The umpire stretches his arms wide, signaling the delivery as a wide. The batting side gets an extra run.",
      "A wayward delivery from the bowler, straying too far off target. The umpire calls it wide, and the batting side benefits with an extra run to their total.",
      "The bowler has overcompensated and sent the ball far outside the off-stump. The umpire immediately signals wide, giving the batting side an easy extra run.",
      "A loose delivery down the leg side, missing the batsman completely. The umpire raises his arm and signals wide, adding another run to the batting side's tally.",
      "The bowler has made a mistake, and the ball is ruled wide. He’ll have to reload and bowl again, as the batting side gains an extra run for the delivery.",
      "The bowler offers far too much width, sending the ball outside the off-stump. The umpire has no hesitation and signals wide, giving the batting side another run.",
      "The batsman watches the ball sail wide, and the umpire immediately raises his arm, signaling a wide ball. The batting side picks up an extra run.",
      "A rare mistake from the bowler he loses his line and concedes a wide delivery, handing the batting side an easy extra run.",
      "The bowler misses his mark and sends the ball too wide. The umpire signals wide, and the batting side is awarded a bonus run.",
      "An erratic delivery from the bowler, straying off target. The umpire stretches his arms and signals wide, giving the batting side an extra run."
    ],
    12: [
      "The bowler oversteps the line, and the umpire signals it as a no-ball. This gives the batting side a free hit, allowing the batsman to play without fear of being dismissed off this delivery.",
      "A costly error from the bowler, who has overstepped the crease. The umpire immediately signals a no-ball, which gives the batting side an extra run and a free hit for the next delivery.",
      "The bowler loses his footing while delivering the ball, and the umpire calls a no-ball. This mistake gives the batting side a free hit and the chance to capitalize on the error.",
      "A rare mistake from the bowler as he oversteps the line. The umpire signals a no-ball, giving the batsman another chance to make an impact without the threat of being out on this delivery.",
      "The umpire stretches his arm, signaling a no-ball. This gives the batting side an extra run and puts additional pressure on the bowler, who has to be more cautious in the next delivery.",
      "The bowler delivers a high full toss, and the umpire calls it a no-ball for height, as the ball is above the batsman’s head. The batting side gets an extra run, and the bowler now faces more pressure to correct his line and length.",
      "The bowler oversteps the crease on this delivery, and the umpire signals it as a no-ball. The batting side is awarded an extra run, and they now have an opportunity to take full advantage of the free hit that follows.",
      "A no-ball from the bowler means the batsman now has a free hit. The pressure shifts to the bowler, as the batsman can play the delivery without fear of being dismissed. Will they make the most of it?",
      "The bowler’s front foot crosses the line, and the umpire calls it a no-ball. This gives the batting side an extra run, and now the batsman will face a free hit on the next delivery, with no chance of being dismissed.",
      "At a crucial moment in the game, the bowler makes a significant error, overstepping the line and conceding a no-ball. The batting side is awarded a bonus run and a free hit, increasing their chances of building momentum."
    ],
    13: [
      "The ball brushes against the batsman’s pads, and they quickly take advantage of the deflection, sneaking in a single. The umpire signals leg byes, awarding the batting side one run.",
      "A soft deflection off the batsman’s body as the ball hits him. The batsmen quickly react and take a single, and the umpire signals leg byes to add one run to the total.",
      "Quick thinking and excellent running from the batsmen as they capitalize on the deflection off the batsman’s body. They easily run for a single, and the umpire calls it leg byes.",
      "The ball clips the batsman’s leg, but the batsmen are alert and quickly run for a single. The umpire signals leg byes, awarding one run to the batting side.",
      "The batsmen show great awareness and quick thinking as they take a single after the ball strikes the pads. The umpire signals leg byes, and the batsmen are awarded a run.",
      "The ball strikes the batsman’s pads, and the batsmen take a quick single. The umpire pats his knee, signaling that the run is credited as leg byes, and one run is added to the batting side’s score.",
      "A slight ricochet off the batsman’s body allows the batsmen to seize the opportunity and run for a single. The umpire signals leg byes, giving the batting side an extra run.",
      "The bowler sends the ball onto the batsman’s pads, and the batsmen react swiftly, running a sharp single. The umpire signals leg byes, and the batting side gets an extra run.",
      "Great awareness from the batsmen as they take a quick single after the ball deflects off the pads. The umpire signals leg byes, and the batting side adds a run to their total.",
      "The ball deflects off the batsman, and the batsmen are quick to react, scampering through for a single. The umpire signals leg byes, granting them one run."
    ],
    14: [
      "The ball slips past the wicketkeeper, and the batsmen react quickly to take advantage of the opportunity, running for a single. The umpire signals byes, awarding the batting side one run.",
      "The wicketkeeper misjudges the ball, allowing it to go through. The batsmen are quick to run for a single, and the umpire signals byes, granting one run to the batting side.",
      "The ball races past the keeper, who misses it completely. The batsmen seize the opportunity and run a single, and the umpire signals byes, awarding one run.",
      "The keeper misses the ball, and the batsmen immediately take off for a single, running quickly between the wickets. The umpire signals byes, giving them one extra run.",
      "The ball goes past the keeper, and the batsmen take advantage of the situation, scampering through for a quick single. The umpire signals byes, adding one run to the score.",
      "The wicketkeeper misfields the ball slightly, allowing the batsmen to sneak in a quick single. The umpire signals byes, granting one run.",
      "The keeper fails to gather the ball cleanly, and the batsmen capitalize on the opportunity, running for a single. The umpire signals byes, awarding one run.",
      "The ball trickles away from the keeper, and the batsmen, aware of the situation, complete a single run. The umpire signals byes, giving them one more run.",
      "The batsmen show excellent awareness as they take a quick single after the ball goes past the keeper. The umpire signals byes, granting them one run.",
      "The ball sneaks past the keeper, and the batsmen take full advantage, running for a quick single. The umpire signals byes, giving them one extra run."
    ],
    15: [
      "Despite the free hit opportunity, the batter fails to score, and the bowler stays composed under pressure, keeping the ball in a challenging line. A dot ball adds to the mounting tension.",
      "The batter takes advantage of the free hit and places the ball cleverly to score a quick single, maintaining the pressure and keeping the scoreboard ticking along.",
      "The batter uses the free hit wisely, timing the ball well and running hard to secure a couple of runs, ensuring the batting side adds valuable runs to their total.",
      "With great awareness and running, the batter pushes hard for three runs on the free hit, making the most of the opportunity and adding crucial runs to the team's total.",
      "The batter seizes the free hit opportunity, delivering a powerful shot that races to the boundary for four, ensuring a valuable boundary and capitalizing on the free hit chance.",
      "In an unusual turn of events, the batter gets caught on a free hit, but since the ball is dead, the batter remains safe, adding a rare moment of drama to the game.",
      "A sensational hit! The batter takes full advantage of the free hit, sending the ball high into the stands for six. A thrilling strike that adds a significant boost to the score.",
      "In an unexpected twist, the batter is given out LBW on a free hit, but the batter stands firm, contesting the appeal. A rare occurrence that adds some drama to the match.",
      "The batter is bowled on a free hit, and the stumps are shattered, but the batter survives, making it a tense and dramatic moment in the match.",
      "The keeper has a chance to dismiss the batter but cannot capitalize as the delivery is a free hit. A missed opportunity for the fielding side.",
      "In a bold but unsuccessful gamble, the batter attempts a run on a free hit but is run out. The fielding side celebrates as the batter is dismissed.",
      "The ball is too wide for the batter to capitalize on. But it's still a free-hit, and the batter has another opportunity to make something happen.",
      "The bowler oversteps again, signaling two consecutive no-balls. This means another free-hit chance for the batter to exploit.",
      "The batter misses the ball, but they manage to sneak in a single via leg bye, as the ball deflects off the body. A small but valuable run for the batting side.",
      "The bowler delivers a fine ball, but the keeper fails to gather it cleanly, allowing the batsmen to run a single through the byes."
    ]
  }
  if (freeHit) {
    return (commentaryData[15][ballOutcome]);
  }
  const commentary = commentaryData[ballOutcome];
  return (commentary[Math.floor(Math.random() * commentary.length)]);
}
export default handleCommentary;