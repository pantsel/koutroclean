/**
 * Platform Service
 */

var _ = require('lodash');

var ChannelService = {
  // Available channels ordered by desc. stability
  availableChannels: [
    'stable',
    'rc',
    'beta',
    'alpha'
  ]
};

/**
 * Retrieves all available channels given the most restrictive one
 * @param  {String} channel Channel name
 * @return {Array}          Applicable channel names ordered by desc. stability
 */
ChannelService.getApplicableChannels = function(channel) {
  var channelIndex = ChannelService.availableChannels.indexOf(channel);

  if (channelIndex === -1) {
    return ['stable'];
  }

  return ChannelService.availableChannels.slice(
    0,
    channelIndex + 1
  );
};


ChannelService.initChannels = function() {
  ChannelService.availableChannels.forEach(function(channel){
    Channel.findOrCreate({'name':channel}).exec(function(err,done){
      if(err) console.log(err)
    })
  })
}

module.exports = ChannelService;
