
    // Contenido: 5 misterios por conjunto con breve referencia bíblica sugerida.
    const MISTERIOS = {
      "Gozosos":[
        "La Anunciación del ángel a la Virgen María — (Lc 1,26-38)",
        "La Visitación de María a su prima Isabel — (Lc 1,39-56)",
        "El Nacimiento de Jesús en Belén — (Lc 2,1-20)",
        "La Presentación de Jesús en el Templo — (Lc 2,22-38)",
        "El Niño Jesús perdido y hallado en el Templo — (Lc 2,41-52)"
      ],
      "Dolorosos":[
        "La Agonía de Jesús en el Huerto — (Mt 26,36-46)",
        "La Flagelación de Jesús — (Mt 27,26)",
        "La Coronación de espinas — (Mt 27,27-31)",
        "Jesús con la cruz a cuestas — (Jn 19,17)",
        "La Crucifixión y muerte de Jesús — (Jn 19,18-30)"
      ],
      "Gloriosos":[
        "La Resurrección de Jesús — (Mt 28,1-10)",
        "La Ascensión de Jesús al cielo — (Lc 24,50-53)",
        "La Venida del Espíritu Santo — (Hch 2,1-4)",
        "La Asunción de María al cielo — (Dogma; meditaciones marianas)",
        "La Coronación de María como Reina del Cielo — (Meditación teológica)"
      ],
      "Luminosos":[
        "El Bautismo de Jesús en el Jordán — (Mt 3,13-17)",
        "La Autorrevelación en las bodas de Caná — (Jn 2,1-11)",
        "El Anuncio del Reino de Dios y la llamada a la conversión — (Mc 1,14-15)",
        "La Transfiguración — (Mt 17,1-9)",
        "La institución de la Eucaristía — (Lc 22,14-20)"
      ]
    };

    // Mapeo (Date.getDay): 0=domingo,1=lunes,...6=sábado
    function conjuntoPorDia(day){
      switch(day){
        case 0: return 'Gloriosos'; // Domingo
        case 1: return 'Gozosos';  // Lunes
        case 2: return 'Dolorosos';// Martes
        case 3: return 'Gloriosos';// Miércoles
        case 4: return 'Luminosos';// Jueves
        case 5: return 'Dolorosos';// Viernes
        case 6: return 'Gozosos';  // Sábado
        default: return 'Gloriosos';
      }
    }

    function showTodayFor(date){
      const dayName = date.toLocaleDateString(undefined,{weekday:'long'});
      const day = date.getDay();
      const conjunto = conjuntoPorDia(day);
      document.getElementById('mysteryPill').textContent = conjunto;
      document.getElementById('dayLabel').textContent = 'Misterios para ' + dayName;
      document.getElementById('dateLabel').textContent = date.toLocaleDateString();

      const list = document.getElementById('mysteriesList');
      list.innerHTML = '';
      const ul = document.createElement('ul');
      MISTERIOS[conjunto].forEach((m, i)=>{
        const li = document.createElement('li');
        li.innerHTML = `<strong>Misterio ${i+1}:</strong> ${m}`;
        ul.appendChild(li);
      });
      list.appendChild(ul);

      const meta = document.getElementById('metaNote');
      meta.textContent = 'Este conjunto aparece hoy por tradición litúrgica. Puedes cambiar de día con los botones.';
    }

    // Rellenar la sección "todos los conjuntos"
    function fillAll(){
      document.getElementById('joyful').innerHTML = MISTERIOS['Gozosos'].map(x=>`<li>${x}</li>`).join('');
      document.getElementById('sorrowful').innerHTML = MISTERIOS['Dolorosos'].map(x=>`<li>${x}</li>`).join('');
      document.getElementById('glorious').innerHTML = MISTERIOS['Gloriosos'].map(x=>`<li>${x}</li>`).join('');
      document.getElementById('luminous').innerHTML = MISTERIOS['Luminosos'].map(x=>`<li>${x}</li>`).join('');
    }

    // Controles
    document.getElementById('showAllBtn').addEventListener('click', ()=>{
      const all = document.getElementById('allCard');
      all.style.display = (all.style.display === 'none') ? 'block' : 'none';
      document.getElementById('showAllBtn').classList.toggle('active');
    });

    let selectedDate = new Date();
    document.getElementById('prevDay').addEventListener('click', ()=>{
      selectedDate.setDate(selectedDate.getDate() - 1);
      showTodayFor(new Date(selectedDate));
    });
    document.getElementById('nextDay').addEventListener('click', ()=>{
      selectedDate.setDate(selectedDate.getDate() + 1);
      showTodayFor(new Date(selectedDate));
    });

    // Inicialización
    fillAll();
    showTodayFor(new Date());
