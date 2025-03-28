import React, { useState } from 'react';

const CarPricePredictor = () => {
  // États pour stocker les valeurs du formulaire
  const [formData, setFormData] = useState({
    marque: '',
    modele: '',
    annee: 2020,
    kilometrage: 0,
    carburant: 'essence',
    boite: 'manuelle',
    puissance: 100,
    nombrePortes: 5,
    couleur: '',
    etat: 'bon'
  });
  
  // État pour le résultat de la prédiction
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Liste des marques communes
  const marques = ['Renault', 'Peugeot', 'Citroën', 'Volkswagen', 'Toyota', 'BMW', 'Mercedes', 'Audi', 'Ford', 'Opel'];
  
  // Liste des carburants
  const carburants = ['essence', 'diesel', 'électrique', 'hybride', 'GPL'];
  
  // Liste des états
  const etats = ['neuf', 'excellent', 'très bon', 'bon', 'moyen', 'à restaurer'];

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Conversion en nombre pour les champs numériques
    const processedValue = ['annee', 'kilometrage', 'puissance', 'nombrePortes'].includes(name)
      ? Number(value)
      : value;
      
    setFormData({
      ...formData,
      [name]: processedValue
    });
  };

  // Fonction de prédiction de prix fictive
  const predictPrice = () => {
    setLoading(true);
    
    // Simulation d'un appel API avec un délai
    setTimeout(() => {
      // Formule simplifiée pour simuler une prédiction
      let basePrice = 10000;
      
      // Ajustement par marque
      const marqueFactors = {
        'BMW': 1.5,
        'Mercedes': 1.6,
        'Audi': 1.4,
        'Volkswagen': 1.2,
        'Toyota': 1.1,
        'Peugeot': 0.9,
        'Renault': 0.85,
        'Citroën': 0.8,
        'Ford': 0.9,
        'Opel': 0.85
      };
      
      const marqueFactor = marqueFactors[formData.marque] || 1;
      
      // Ajustement par année (prix diminue avec l'âge)
      const currentYear = new Date().getFullYear();
      const ageDiscount = (currentYear - formData.annee) * 0.05;
      
      // Ajustement par kilométrage
      const kmDiscount = formData.kilometrage / 20000 * 0.1;
      
      // Ajustement par carburant
      const fuelFactors = {
        'essence': 1,
        'diesel': 1.1,
        'électrique': 1.4,
        'hybride': 1.3,
        'GPL': 0.9
      };
      
      const fuelFactor = fuelFactors[formData.carburant] || 1;
      
      // Ajustement par état
      const stateFactors = {
        'neuf': 1.5,
        'excellent': 1.3,
        'très bon': 1.15,
        'bon': 1,
        'moyen': 0.8,
        'à restaurer': 0.6
      };
      
      const stateFactor = stateFactors[formData.etat] || 1;
      
      // Calcul final
      const estimatedPrice = basePrice * marqueFactor * (1 - ageDiscount) * (1 - kmDiscount) * fuelFactor * stateFactor * (formData.puissance / 100);
      
      // Arrondir à l'euro près
      const finalPrice = Math.round(estimatedPrice);
      
      setPrediction(finalPrice);
      setLoading(false);
    }, 1000);
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    predictPrice();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Prédiction du Prix des Voitures</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Marque */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marque</label>
            <select 
              name="marque" 
              value={formData.marque} 
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Sélectionnez une marque</option>
              {marques.map(marque => (
                <option key={marque} value={marque}>{marque}</option>
              ))}
            </select>
          </div>
          
          {/* Modèle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Modèle</label>
            <input 
              type="text" 
              name="modele" 
              value={formData.modele} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          {/* Année */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Année</label>
            <input 
              type="number" 
              name="annee" 
              min="1990" 
              max="2025" 
              value={formData.annee} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          {/* Kilométrage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kilométrage</label>
            <input 
              type="number" 
              name="kilometrage" 
              min="0" 
              max="500000" 
              value={formData.kilometrage} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          {/* Carburant */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Carburant</label>
            <select 
              name="carburant" 
              value={formData.carburant} 
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {carburants.map(carburant => (
                <option key={carburant} value={carburant}>{carburant.charAt(0).toUpperCase() + carburant.slice(1)}</option>
              ))}
            </select>
          </div>
          
          {/* Boîte de vitesse */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Boîte de vitesse</label>
            <select 
              name="boite" 
              value={formData.boite} 
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="manuelle">Manuelle</option>
              <option value="automatique">Automatique</option>
            </select>
          </div>
          
          {/* Puissance */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Puissance (ch)</label>
            <input 
              type="number" 
              name="puissance" 
              min="50" 
              max="500" 
              value={formData.puissance} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          {/* Nombre de portes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de portes</label>
            <select 
              name="nombrePortes" 
              value={formData.nombrePortes} 
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="3">3</option>
              <option value="5">5</option>
            </select>
          </div>
          
          {/* Couleur */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Couleur</label>
            <input 
              type="text" 
              name="couleur" 
              value={formData.couleur} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* État */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">État</label>
            <select 
              name="etat" 
              value={formData.etat} 
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {etats.map(etat => (
                <option key={etat} value={etat}>{etat.charAt(0).toUpperCase() + etat.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex justify-center mt-6">
          <button 
            type="submit" 
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Calcul en cours...' : 'Prédire le prix'}
          </button>
        </div>
      </form>
      
      {prediction !== null && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Estimation du prix</h2>
          <p className="text-3xl font-bold text-blue-700">{prediction.toLocaleString('fr-FR')} €</p>
          <p className="text-sm text-gray-500 mt-2">
            Ce prix est une estimation basée sur les caractéristiques fournies et notre modèle de prédiction.
          </p>
        </div>
      )}
    </div>
  );
};

export default CarPricePredictor;