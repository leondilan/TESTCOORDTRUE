$(document).ready(function () {

    $('.spinner-border').hide();

    $('button').click(function (e) { 
        e.preventDefault();

        $('.spinner-border').show();

        // Vérifie si la géolocalisation est prise en charge par le navigateur
        if ("geolocation" in navigator) {
            // Obtient les coordonnées géographiques de l'utilisateur
            navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            function haversineDistance(lat1, lon1, lat2, lon2) {
                const R = 6371000; // Rayon de la Terre en mètres
                const dLat = (lat2 - lat1) * Math.PI / 180;
                const dLon = (lon2 - lon1) * Math.PI / 180;
                const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                          Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                          Math.sin(dLon / 2) * Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const distance = R * c;
              
                return distance;
            }
              
            function isInRadius(coord1, coord2, radius) {
                const distance = haversineDistance(coord1.lat, coord1.lon, coord2.lat, coord2.lon);
                return distance <= radius;
            }
              
            // Exemple d'utilisation
            const centerCoord = { lat: 4.0511, lon: 9.7019 }; // Coordonnées du centre
            const testCoord = { lat: latitude, lon: longitude }; // Coordonnées à tester
            const radius = 1; // Rayon en mètres
            
            const result = isInRadius(centerCoord, testCoord, radius);

            if (result) {
                $('.status').text("INTERIEUR");
                $('.spinner-border').hide();
            } else {
                $('.status').text("DEHORS");
                $('.spinner-border').hide();
            }
            
            //console.log(result); // Affiche true si les coordonnées sont dans le rayon, sinon false
            
            // Vous pouvez maintenant utiliser ces valeurs pour vos besoins
            }, function(error) {
                console.error("Erreur de géolocalisation:", error);
            });
        } else {
            console.log("La géolocalisation n'est pas prise en charge par ce navigateur.");
        }
          
    });
});