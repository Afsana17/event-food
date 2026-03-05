const Event = require('../models/event');
const Venue = require('../models/venue');
const Ticket = require('../models/ticket');
const crypto = require('crypto');

const DEFAULT_SPORT_EVENTS = [
  {
    _id: 'default-football',
    name: 'Football Championship',
    title: 'Football Championship',
    description: 'Competitive football event at 5RINGS for all skill levels.',
    sport: 'Football',
    type: 'tournament',
    eventType: 'tournament',
    status: 'upcoming',
    startDate: new Date('2026-04-12T16:00:00.000Z'),
    endDate: new Date('2026-04-12T19:00:00.000Z'),
    venue: { name: '5RINGS Main Arena' },
    ticketPrice: 1800,
    images: ['/events/football.jpg']
  },
  {
    _id: 'default-cricket',
    name: 'Cricket League Day',
    title: 'Cricket League Day',
    description: 'Cricket action with coaching guidance and match play opportunities.',
    sport: 'Cricket',
    type: 'match',
    eventType: 'match',
    status: 'upcoming',
    startDate: new Date('2026-04-19T15:30:00.000Z'),
    endDate: new Date('2026-04-19T19:30:00.000Z'),
    venue: { name: '5RINGS Cricket Zone' },
    ticketPrice: 1600,
    images: ['/events/cricket.jpg']
  },
  {
    _id: 'default-tennis',
    name: 'Tennis Open Session',
    title: 'Tennis Open Session',
    description: 'Structured tennis sessions for juniors and adults.',
    sport: 'Tennis',
    type: 'camp',
    eventType: 'camp',
    status: 'upcoming',
    startDate: new Date('2026-04-26T06:30:00.000Z'),
    endDate: new Date('2026-04-26T09:30:00.000Z'),
    venue: { name: '5RINGS Tennis Court' },
    ticketPrice: 1400,
    images: ['/5rings.jpg']
  },
  {
    _id: 'default-kickboxing',
    name: 'Kick Boxing Intensive',
    title: 'Kick Boxing Intensive',
    description: 'Kick boxing training and sparring sessions with expert coaches.',
    sport: 'Kick boxing',
    type: 'workshop',
    eventType: 'workshop',
    status: 'upcoming',
    startDate: new Date('2026-05-03T10:00:00.000Z'),
    endDate: new Date('2026-05-03T13:00:00.000Z'),
    venue: { name: '5RINGS Combat Studio' },
    ticketPrice: 1700,
    images: ['/5rings.jpg']
  },
  {
    _id: 'default-tabletennis',
    name: 'Table Tennis Challenge',
    title: 'Table Tennis Challenge',
    description: 'Fast-paced table tennis challenge event for enthusiasts.',
    sport: 'Table tennis',
    type: 'tournament',
    eventType: 'tournament',
    status: 'upcoming',
    startDate: new Date('2026-05-10T08:30:00.000Z'),
    endDate: new Date('2026-05-10T12:00:00.000Z'),
    venue: { name: '5RINGS Indoor Hall' },
    ticketPrice: 1300,
    images: ['/5rings.jpg']
  },
  {
    _id: 'default-silambam',
    name: 'Silambam Heritage Workshop',
    title: 'Silambam Heritage Workshop',
    description: 'Traditional Silambam training with foundational and advanced drills.',
    sport: 'Silambam',
    type: 'workshop',
    eventType: 'workshop',
    status: 'upcoming',
    startDate: new Date('2026-05-17T07:00:00.000Z'),
    endDate: new Date('2026-05-17T10:00:00.000Z'),
    venue: { name: '5RINGS Outdoor Ground' },
    ticketPrice: 1200,
    images: ['/5rings.jpg']
  },
  {
    _id: 'default-archery',
    name: 'Arcery Precision Camp',
    title: 'Arcery Precision Camp',
    description: 'Archery fundamentals and precision rounds in a guided format.',
    sport: 'Arcery',
    type: 'camp',
    eventType: 'camp',
    status: 'upcoming',
    startDate: new Date('2026-05-24T06:00:00.000Z'),
    endDate: new Date('2026-05-24T09:00:00.000Z'),
    venue: { name: '5RINGS Archery Range' },
    ticketPrice: 1500,
    images: ['/5rings.jpg']
  }
];

// Create Event (Event Organizer only)
exports.createEvent = async (req, res) => {
  try {
    // Check if venue exists, if not create a default one
    let venueId = req.body.venue;
    
    // If no venue or default, create/find default venue
    if (!venueId || venueId === 'default' || venueId === '') {
      // Check if default venue exists
      let defaultVenue = await Venue.findOne({ name: 'Main Stadium' });
      
      if (!defaultVenue) {
        console.log('Creating default venue...');
        // Create default venue
        defaultVenue = await Venue.create({
          name: 'Main Stadium',
          address: {
            street: '123 Sports Ave',
            city: 'Sports City',
            state: 'SC',
            zipCode: '12345',
            country: 'USA',
          },
          capacity: 1000,
          facilities: ['Parking', 'Restrooms', 'Food Court'],
          createdBy: req.user.id,
        });
        console.log('Default venue created:', defaultVenue._id);
      } else {
        console.log('Using existing default venue:', defaultVenue._id);
      }
      venueId = defaultVenue._id;
    }
    
    // Create event with valid venue ObjectId
    const eventData = {
      title: req.body.title,
      description: req.body.description,
      sport: req.body.sport,
      eventType: req.body.eventType,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      ticketCategories: req.body.ticketCategories,
      images: Array.isArray(req.body.images) && req.body.images.length ? req.body.images : ['/5rings.jpg'],
      status: req.body.status || 'draft',
      venue: venueId,
      organizer: req.user.id,
    };
    
    const event = new Event(eventData);
    await event.save();
    res.status(201).json({ success: true, event });
  } catch (error) {
    console.error('Event creation error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const { sport, eventType, status, featured } = req.query;
    const filter = {};
    
    if (sport) filter.sport = sport;
    if (eventType) filter.eventType = eventType;
    if (status) filter.status = status;
    if (featured === 'true') filter.featuredEvent = true;

    const events = await Event.find(filter)
      .populate('organizer', 'name email organizerProfile')
      .populate('venue')
      .sort({ startDate: 1 });

    const normalizedDbEvents = events.map((eventDoc) => {
      const event = eventDoc.toObject();
      return {
        ...event,
        name: event.name || event.title,
        type: event.type || event.eventType,
        ticketPrice: event.ticketPrice || event.ticketCategories?.[0]?.price || 0,
      };
    });

    const existingSports = new Set(
      normalizedDbEvents.map((event) => (event.sport || '').toLowerCase())
    );

    const defaultEvents = DEFAULT_SPORT_EVENTS.filter((event) => !existingSports.has((event.sport || '').toLowerCase()));

    const allEvents = [...normalizedDbEvents, ...defaultEvents];
    
    res.json({ success: true, events: allEvents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single event
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email organizerProfile')
      .populate('venue')
      .populate('coaches', 'name coachProfile');
    
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    
    res.json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    
    // Check if user is the organizer or admin
    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this event' });
    }
    
    Object.assign(event, req.body);
    await event.save();
    
    res.json({ success: true, event });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    
    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this event' });
    }
    
    await event.deleteOne();
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Book ticket
exports.bookTicket = async (req, res) => {
  try {
    const { eventId, category, seatNumber, mealCombo } = req.body;
    
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    
    const ticketCategory = event.ticketCategories.find(tc => tc.name === category);
    if (!ticketCategory) {
      return res.status(400).json({ success: false, message: 'Invalid ticket category' });
    }
    
    if (ticketCategory.available <= ticketCategory.sold) {
      return res.status(400).json({ success: false, message: 'Tickets sold out for this category' });
    }
    
    // Generate QR code
    const qrCode = crypto.randomBytes(32).toString('hex');
    
    const ticket = new Ticket({
      event: eventId,
      user: req.user.id,
      category,
      seatNumber,
      price: ticketCategory.price,
      qrCode,
      mealCombo,
    });
    
    await ticket.save();
    
    // Update sold count
    ticketCategory.sold += 1;
    event.totalRevenue += ticketCategory.price;
    await event.save();
    
    res.status(201).json({ success: true, ticket });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get user's tickets
exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id })
      .populate('event', 'title sport startDate endDate venue')
      .sort({ bookingDate: -1 });
    
    res.json({ success: true, tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get organizer's events
exports.getOrganizerEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user.id })
      .populate('venue')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
