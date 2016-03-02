---
layout: page
title: HSReplay - Hearthstone Replays
permalink: /hsreplay/
---

**HSReplay** is a specification for Hearthstone replays.

The DTD for HSReplay 1.1 is available here:

http://hearthsim.info/hsreplay/dtd/hsreplay-1.1.dtd

For development and reference implementations in Python and C#, see the Github repository:

https://github.com/hearthsim/hsreplay


## Example replay

Here follows a very, very shortened example file. Real-world examples will have
far more tag changes, entity definitions, etc.

```xml
<?xml version="1.0" ?>
<!DOCTYPE hsreplay SYSTEM "http://hearthsim.info/hsreplay/dtd/hsreplay-1.1.dtd">
<HSReplay version="1.1">
	<Game id="41025571">
		<GameEntity id="1">
			<Tag tag="10" value="85"/>
			<Tag tag="20" value="1"/>
			<Tag tag="49" value="1"/>
			<Tag tag="53" value="1"/>
			<Tag tag="198" value="4"/>
			<Tag tag="202" value="1"/>
			<Tag tag="204" value="2"/>
		</GameEntity>
		<Player accountHi="144115198130930503" accountLo="0" id="2" name="Zinaar" playerID="1">
			<Tag tag="7" value="75"/>
			<Tag tag="17" value="1"/>
			<Tag tag="23" value="1"/>
			<Tag tag="24" value="1"/>
			<Tag tag="27" value="64"/>
			<Tag tag="399" value="3"/>
		</Player>
		<Player accountHi="144115198130930503" accountLo="18493185" id="3" name="Adys" playerID="2">
			<Tag tag="7" value="75"/>
			<Tag tag="17" value="1"/>
			<Tag tag="27" value="66"/>
			<Tag tag="399" value="4"/>
		</Player>
		<FullEntity id="4">
			<Tag tag="49" value="2"/>
		</FullEntity>
		<FullEntity id="5">
			<Tag tag="49" value="2"/>
		</FullEntity>
		<FullEntity id="6">
			<Tag tag="49" value="2"/>
		</FullEntity>
		<TagChange entity="3" tag="7" value="75"/>
		<TagChange entity="3" tag="17" value="1"/>
		<Action entity="1" target="0" ts="01:34:02.831045" type="5">
			<TagChange entity="2" tag="305" value="1"/>
			<Choices entity="2" id="1" max="3" min="0" source="1" taskList="3" ts="01:34:02.910178" type="1">
				<Choice entity="30" index="0"/>
				<Choice entity="21" index="1"/>
				<Choice entity="19" index="2"/>
			</Choices>
			<TagChange entity="3" tag="305" value="1"/>
			<Choices entity="3" id="2" max="5" min="0" source="1" taskList="4" ts="01:34:03.074005" type="1">
				<Choice entity="44" index="0"/>
				<Choice entity="45" index="1"/>
				<Choice entity="63" index="2"/>
				<Choice entity="48" index="3"/>
				<Choice entity="68" index="4"/>
			</Choices>
			<SendChoices id="2" ts="01:34:25.711798" type="1">
				<Choice entity="45" index="0"/>
				<Choice entity="63" index="1"/>
				<Choice entity="48" index="2"/>
			</SendChoices>
		</Action>
		<TagChange entity="3" tag="305" value="2"/>
		<Action entity="3" target="0" ts="01:34:26.046603" type="5">
			<ShowEntity cardID="EX1_414" entity="49">
				<Tag tag="45" value="9"/>
			</ShowEntity>
			<TagChange entity="49" tag="263" value="1"/>
			<HideEntity entity="44" ts="01:34:26.051981" zone="2"/>
			<TagChange entity="44" tag="49" value="2"/>
		</Action>
		<ChosenEntities entity="2" id="1" ts="01:34:26.263134">
			<Choice entity="30" index="0"/>
			<Choice entity="21" index="1"/>
			<Choice entity="19" index="2"/>
		</ChosenEntities>
	</Game>
</HSReplay>
```
