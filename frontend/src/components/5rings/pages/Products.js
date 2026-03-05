import React, { useMemo, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  MenuItem,
  Chip,
  Stack,
  Snackbar,
  Alert,
  alpha
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import Layout from '../components/Layout.js';
import { useCart } from '../../../context/CartContext';
import {
  Search as SearchIcon,
  AddShoppingCart as AddShoppingCartIcon
} from '@mui/icons-material';

const foodItems = [
  {
    _id: 'food-1',
    name: 'High-Calorie Venpongal Bowl',
    goal: 'underweight',
    calories: 620,
    protein: 18,
    price: 299,
    originalPrice: 379,
    isVeg: true,
    image: '/food/venpongal.jpg',
    imagePosition: 'center 36%',
    description: 'Balanced venpongal bowl with ghee, cashews, and protein side for healthy weight gain.'
  },
  {
    _id: 'food-2',
    name: 'Lean Millet Power Plate',
    goal: 'overweight',
    calories: 380,
    protein: 22,
    price: 269,
    originalPrice: 329,
    isVeg: true,
    image: '/food/millet%20bowl.jpg',
    imagePosition: 'center 34%',
    description: 'Low-oil millet meal with greens and lentils tailored for fat-loss nutrition.'
  },
  {
    _id: 'food-3',
    name: 'Maintenance South Indian Combo',
    goal: 'maintenance',
    calories: 470,
    protein: 20,
    price: 279,
    originalPrice: 349,
    isVeg: true,
    image: '/food/south-indian%20combo.jpg',
    imagePosition: 'center 34%',
    description: 'Steady-energy combo meal for active people maintaining current body weight.'
  },
  {
    _id: 'food-4',
    name: 'High-Protein Recovery Meal',
    goal: 'high-protein',
    calories: 540,
    protein: 36,
    price: 449,
    originalPrice: 549,
    isVeg: false,
    image: '/food/recovery%20meal.jpg',
    imagePosition: 'center 30%',
    description: 'Protein-rich post-workout meal designed to support muscle recovery.'
  },
  {
    _id: 'food-5',
    name: 'Fiber-Rich Light Dinner Box',
    goal: 'overweight',
    calories: 330,
    protein: 16,
    price: 219,
    originalPrice: 279,
    isVeg: true,
    image: '/food/dinner%20box.jpg',
    imagePosition: 'center 35%',
    description: 'Light evening meal with high fiber and clean carbs for better satiety.'
  },
  {
    _id: 'food-6',
    name: 'Mass Gain Athlete Meal',
    goal: 'underweight',
    calories: 710,
    protein: 32,
    price: 529,
    originalPrice: 649,
    isVeg: false,
    image: '/food/Mass%20Gain%20Athlete%20Meal.jpg',
    imagePosition: 'center 26%',
    description: 'Athlete-focused calorie-dense meal for healthy mass gain goals.'
  },
  {
    _id: 'food-7',
    name: 'Boiled Egg Protein Box',
    goal: 'high-protein',
    calories: 360,
    protein: 28,
    price: 199,
    originalPrice: 249,
    isVeg: false,
    image: '/food/Boiled%20Egg%20Protein%20Box.jpg',
    imagePosition: 'center 18%',
    description: 'Egg-based protein snack box ideal for lean muscle support and satiety.'
  }
];

const goalOptions = [
  { key: 'all', label: 'All Category' },
  { key: 'underweight', label: 'Under Weight' },
  { key: 'overweight', label: 'Over Weight' },
  { key: 'maintenance', label: 'Maintenance' },
  { key: 'high-protein', label: 'High Protein' }
];

const calorieRanges = [
  { key: 'all', label: 'All Calories' },
  { key: 'low', label: '250 - 400 kcal' },
  { key: 'medium', label: '401 - 550 kcal' },
  { key: 'high', label: '551 - 800 kcal' }
];

const priceRanges = [
  { key: 'all', label: 'All Prices' },
  { key: 'budget', label: 'Under ₹250' },
  { key: 'standard', label: '₹250 - ₹400' },
  { key: 'premium', label: '₹400 - ₹550' },
  { key: 'elite', label: 'Above ₹550' }
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [goalFilter, setGoalFilter] = useState('all');
  const [foodCategory, setFoodCategory] = useState('all');
  const [calorieFilter, setCalorieFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [addedMessage, setAddedMessage] = useState('');
  const [showAddedToast, setShowAddedToast] = useState(false);
  const { addToCart } = useCart();

  const handleAddMeal = (food) => {
    addToCart(food);
    setAddedMessage(`${food.name} added to cart`);
    setShowAddedToast(true);
  };

  const filteredFoods = useMemo(() => {
    return foodItems.filter((food) => {
      const matchesSearch =
        food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGoal = goalFilter === 'all' ? true : food.goal === goalFilter;
      const matchesCategory =
        foodCategory === 'all' ? true : foodCategory === 'veg' ? food.isVeg : !food.isVeg;
      const matchesCalories =
        calorieFilter === 'all'
          ? true
          : calorieFilter === 'low'
            ? food.calories >= 250 && food.calories <= 400
            : calorieFilter === 'medium'
              ? food.calories >= 401 && food.calories <= 550
              : food.calories >= 551 && food.calories <= 800;

      const matchesPrice =
        priceFilter === 'all'
          ? true
          : priceFilter === 'budget'
            ? food.price < 250
            : priceFilter === 'standard'
              ? food.price >= 250 && food.price < 400
              : priceFilter === 'premium'
                ? food.price >= 400 && food.price <= 550
                : food.price > 550;

      return matchesSearch && matchesGoal && matchesCategory && matchesCalories && matchesPrice;
    });
  }, [searchTerm, goalFilter, foodCategory, calorieFilter, priceFilter]);

  return (
    <Layout>
      <Box sx={{ pt: 12, bgcolor: '#FAFAFA', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Box sx={{ maxWidth: 900, mx: 'auto', textAlign: 'center', mb: 8 }}>
            <Typography variant="h1" fontWeight={900} sx={{ fontSize: { xs: '2.6rem', md: '4.2rem' }, mb: 3, color: '#1a1a1a' }}>
              Healthy{' '}
              <Box
                component="span"
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 8,
                    left: 0,
                    width: '100%',
                    height: 12,
                    bgcolor: alpha('#1a1a1a', 0.1),
                    zIndex: -1
                  }
                }}
              >
                Food Plans
              </Box>
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 760, mx: 'auto', lineHeight: 1.7 }}>
              Goal-based meals for under weight, over weight, maintenance, and high-protein recovery.
              Choose from veg and non-veg options that match your body goal and training routine.
            </Typography>
          </Box>

          <Card elevation={0} sx={{ p: 3, mb: 6, bgcolor: 'white', border: '1px solid', borderColor: 'rgba(0,0,0,0.08)', borderRadius: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  placeholder="Search healthy food..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
                />
              </Grid>

              <Grid item xs={12} md={7}>
                <TextField
                  select
                  fullWidth
                  label="Goal Category"
                  value={goalFilter}
                  onChange={(event) => setGoalFilter(event.target.value)}
                >
                  {goalOptions.map((goal) => (
                    <MenuItem key={goal.key} value={goal.key}>{goal.label}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  label="Calorie Range"
                  value={calorieFilter}
                  onChange={(event) => setCalorieFilter(event.target.value)}
                >
                  {calorieRanges.map((range) => (
                    <MenuItem key={range.key} value={range.key}>{range.label}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  label="Food Type"
                  value={foodCategory}
                  onChange={(event) => setFoodCategory(event.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="veg">Veg</MenuItem>
                  <MenuItem value="non-veg">Non-Veg</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  label="Price Range"
                  value={priceFilter}
                  onChange={(event) => setPriceFilter(event.target.value)}
                >
                  {priceRanges.map((range) => (
                    <MenuItem key={range.key} value={range.key}>{range.label}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Card>

          {filteredFoods.length === 0 ? (
            <Card elevation={0} sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
                No food plans found
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Change goal, calories, or search text to view matching meal plans.
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  setSearchTerm('');
                  setGoalFilter('all');
                  setFoodCategory('all');
                  setCalorieFilter('all');
                  setPriceFilter('all');
                }}
                sx={{ bgcolor: '#1a1a1a', '&:hover': { bgcolor: '#2a2a2a' } }}
              >
                Reset Filters
              </Button>
            </Card>
          ) : (
            <Grid container spacing={4}>
              {filteredFoods.map((food) => (
                <Grid item xs={12} sm={6} md={4} key={food._id}>
                  <Card elevation={0} sx={{ height: '100%', borderRadius: 3, border: '1px solid', borderColor: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      image={food.image || '/5rings.jpg'}
                      alt={food.name}
                      sx={{
                        height: 220,
                        objectFit: 'cover',
                        objectPosition: food.imagePosition || 'center'
                      }}
                    />

                    <CardContent>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                        <Chip
                          label={food.goal.replace('-', ' ')}
                          size="small"
                          sx={{ textTransform: 'capitalize', bgcolor: 'rgba(26,26,26,0.08)', color: '#1a1a1a' }}
                        />
                        <Chip label={food.isVeg ? 'Veg' : 'Non-Veg'} size="small" color={food.isVeg ? 'success' : 'default'} />
                      </Stack>

                      <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                        {food.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ minHeight: 44, mb: 2 }}>
                        {food.description}
                      </Typography>

                      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">{food.calories} kcal</Typography>
                        <Typography variant="body2" color="text.secondary">{food.protein}g protein</Typography>
                      </Stack>

                      <Typography variant="h5" fontWeight={900} sx={{ color: '#1a1a1a' }}>
                        ₹{food.price}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2" sx={{ color: '#9ca3af', textDecoration: 'line-through' }}>
                          ₹{food.originalPrice || food.price}
                        </Typography>
                        <Chip
                          size="small"
                          color="success"
                          label={`${Math.max(0, Math.round((((food.originalPrice || food.price) - food.price) / (food.originalPrice || food.price)) * 100))}% OFF`}
                        />
                      </Stack>
                    </CardContent>

                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<AddShoppingCartIcon />}
                        onClick={() => handleAddMeal(food)}
                        sx={{ bgcolor: '#1a1a1a', textTransform: 'none', '&:hover': { bgcolor: '#2a2a2a' } }}
                      >
                        Add Meal
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      <Snackbar
        open={showAddedToast}
        autoHideDuration={1800}
        onClose={() => setShowAddedToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowAddedToast(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
          {addedMessage}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default Products;
