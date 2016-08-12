#FXBOT

Foreign Exchange Bot.
This application is just an experiment on the Facebook messenger bot

[![Greetings](https://s10.postimg.org/8oetjggbd/Screen_Shot_2016_08_12_at_10_28_10_PM.png)](https://postimg.org/image/hw7205ndh/)
[![Check Rates](https://s9.postimg.org/rm7hr48jj/Screen_Shot_2016_08_12_at_10_29_57_PM.png)](https://postimg.org/image/6pb9mgaij/)
[![Commands](https://s10.postimg.org/dwiu74vih/Screen_Shot_2016_08_12_at_10_30_30_PM.png)](https://postimg.org/image/vmkis6939/)


This bot only works for three currencies converting to naira by default.

1. USD | dollars | dollar
2. GBP | pounds | pound
3. EUR | euros | euro

Commands

```
rates || rate => To view current rates
convert 50 euros => to convert 50 euros to naira(default) 
convert 100 dollars to naira
convert 100 USD (currency is case sensitive for now :D) defaults to naira conversion.
```

Development

```
Create your environment variables

 -- WEBHOOK_TOKEN
 -- PAGE_ACCESS_TOKEN

$ npm install
$ gulp
```
