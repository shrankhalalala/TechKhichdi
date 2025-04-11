export const recommendStack = ({ projectKind, appType, language, budget }) => {
	if (projectKind === 'Browser' && language === 'JavaScript') {
	  return {
		frontend: ['React', 'Next.js'],
		backend: ['Node.js', 'Express'],
		database: ['MongoDB'],
		hosting: ['Vercel'],
	  };
	}
  
	if (projectKind === 'App' && appType === 'Mobile' && language === 'JavaScript') {
	  return {
		frontend: ['React Native'],
		backend: ['Firebase'],
		database: ['Firestore'],
		hosting: ['Firebase Hosting'],
	  };
	}
  
	// Add more rules...
	return { message: 'No matching stack found.' };
  };