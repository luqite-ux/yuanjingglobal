const base = 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/tenants/yuanjingglobal/factory'

const records = [
  ['01', '95e14cd104c2c11629700d92', 'Facility', 'Building 24 entrance and press hall', 'Entrance to Yuanjing Building 24 opening onto the production floor'],
  ['02', '744752037ca438ddb43d11fe', 'Press shop', 'Press line overview', 'Wide view across a Yuanjing press line and material handling area'],
  ['03', '67324117ddd3abd7e1bcc3e7', 'Press shop', 'High-bay production floor', 'High-bay production floor with presses and handling equipment'],
  ['04', '0f09d244103208bf7d3682e5', 'Tooling', 'Mold storage racks', 'Green storage racks holding backing-plate molds and production tooling'],
  ['05', '7675f4371d607320925813d3', 'Tooling', 'Tooling storage area', 'Organized mold and tooling storage beside the production aisle'],
  ['06', '68e533d4a077e61b98e6ce2f', 'Tooling', 'Tooling aisles', 'Parallel tooling racks with a clear central handling aisle'],
  ['07', '5288e43901a71ed19838f781', 'Blanking', 'Automatic feed line', 'Sheet-steel feed equipment positioned beside a stamping press'],
  ['08', '1d8273e88334cbea95498f9f', 'Blanking', 'Press with automatic feed', 'Stamping press connected to an automatic sheet feeding system'],
  ['09', 'e7ca13bdcee9e7f9ad7d93a4', 'Press shop', 'Press hall overview', 'Multiple presses arranged along the Yuanjing production floor'],
  ['10', 'e8f005c922c1f492d8f993d0', 'Blanking', 'Automatic blanking line', 'Automatic blanking line with stamped plate outlines moving through the press'],
  ['11', '2b5143392f4c8879393638b4', 'Press shop', 'Production equipment row', 'Row of production machines inside the press hall'],
  ['12', '2a57a95e1178ca331cea5496', 'Stamping', 'Die operation', 'Backing-plate die operating inside a stamping press'],
  ['13', 'a20f5f1aad44d08de3ee26ef', 'Stamping', 'Part removal at the press', 'Stamped backing plate being removed from the die area'],
  ['14', '404f7d57b5ecdf9b961e3a53', 'Deburring', 'Deburring conveyor', 'Stamped backing plates travelling across the deburring conveyor'],
  ['15', 'd120ad2adfcfc5ac8aab3164', 'Deburring', 'Edge finishing line', 'Backing plates passing through the edge finishing machine'],
  ['16', 'c29ee7f799278db20ca8540d', 'Handling', 'Finished part handling', 'Finished backing plates collected after the finishing operation'],
  ['17', '2293b7b92d17ddaa3b0b6a40', 'Tooling', 'Tooling inventory', 'Numbered tooling racks used to organize molds and fixtures'],
  ['18', '9ef7e24bb9e68e53d62a0858', 'Machining', 'Automatic processing system', 'Automatic processing equipment with motor, cylinders and guide rails'],
  ['19', 'ddbb98ff0632efe43cb91e16', 'Machining', 'Punching and chamfering station', 'Automatic punching and chamfering equipment for hole and edge operations'],
  ['20', '2f7ba5956073e957be5c7ab8', 'Press shop', 'Production line panorama', 'Panoramic view of the press line and operator access aisle'],
  ['21', '0eb74a06de0358ea67899368', 'Handling', 'Plate feed stack', 'Stacked backing plates prepared for the next automated operation'],
  ['22', '7c59b3bfe802a3f0a16acaf6', 'Machining', 'Automated fixture station', 'Automated fixture station handling backing plates in sequence'],
  ['23', '4a959b9f4dcf65aff55224eb', 'Handling', 'Parts collection', 'Metal collection bin positioned beside the processing equipment'],
] as const

export const factoryGallery = records.map(([id, hash, group, title, alt]) => ({
  id,
  src: `${base}/${id}/${hash}.png`,
  group,
  title,
  alt,
}))
