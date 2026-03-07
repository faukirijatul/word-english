import Word from '../models/word.model.js';

// create
export const createNewWordController = async (req, res) => {
  const { english, indonesia } = req.body;

  if (!english || !indonesia) {
    return res
      .status(400)
      .json({ message: 'English and Indonesian words are required' });
  }

  const isEnglishExists = await Word.findOne({
    english,
  }).then((word) => !!word);

  if (isEnglishExists) {
    return res.status(400).json({ message: 'English word already exists' });
  }

  const newWord = new Word({
    english,
    indonesia,
  });

  newWord
    .save()
    .then((word) => res.status(201).json({ message: 'Word created', word }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

// get by id
export const getWordByIdController = (req, res) => {
  const { id } = req.params;

  Word.findById(id)
    .then((word) => res.status(200).json({ message: 'Word found', word }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

// get all with search by english or indonesia and sorted by english
export const getAllWordsController = (req, res) => {
  const { search } = req.query;

  if (search) {
    Word.find({
      $or: [
        { english: { $regex: search, $options: 'i' } },
        { indonesia: { $regex: search, $options: 'i' } },
      ],
    })
      .sort({ english: 1 })
      .then((words) => res.status(200).json({ message: 'Words found', words }))
      .catch((err) => res.status(500).json({ message: err.message }));
  } else {
    Word.find()
      .sort({ english: 1 })
      .then((words) => res.status(200).json({ message: 'Words found', words }))
      .catch((err) => res.status(500).json({ message: err.message }));
  }
};

// update by id
export const updateWordByIdController = async (req, res) => {
  const { id } = req.params;

  const { english, indonesia } = req.body;

  if (!english || !indonesia) {
    return res
      .status(400)
      .json({ message: 'English and Indonesian words are required' });
  }

  //   check if word exists except for this id
  const isEnglishExists = await Word.findOne({
    english,
    _id: { $ne: id },
  }).then((word) => !!word);

  if (isEnglishExists) {
    return res.status(400).json({ message: 'English word already exists' });
  }

  Word.findById(id)
    .then((word) => {
      if (!word) {
        return res.status(404).json({ message: 'Word not found' });
      }
      
      word.english = english;
      word.indonesia = indonesia;

      word
        .save()
        .then((word) => res.status(200).json({ message: 'Word updated', word }))
        .catch((err) => res.status(500).json({ message: err.message }));
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

// delete by id
export const deleteWordByIdController = (req, res) => {
  const { id } = req.params;

  Word.findByIdAndDelete(id)
    .then((word) => res.status(200).json({ message: 'Word deleted', word }))
    .catch((err) => res.status(500).json({ message: err.message }));
};
