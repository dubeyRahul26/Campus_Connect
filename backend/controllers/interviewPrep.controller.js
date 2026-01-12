import InterviewPrep from "../models/interviewPrep.model.js";

/* CREATE */
export const createPost = async (req, res) => {
  const post = await InterviewPrep.create({
    ...req.body,
    createdBy: req.user._id,
  });
  res.status(201).json(post);
};

/* GET */
export const getPosts = async (req, res) => {
  const { type, company, role, search, tag, sort } = req.query;
  const query = {};

  if (req.user.role !== "admin") {
    query.isHidden = { $ne: true };
  }

  if (type) query.type = type;
  if (company) query.company = new RegExp(company, "i");
  if (role) query.role = new RegExp(role, "i");
  if (tag) query.tags = tag;

  if (search) {
    query.$or = [
      { title: new RegExp(search, "i") },
      { content: new RegExp(search, "i") },
      { company: new RegExp(search, "i") },
      { role: new RegExp(search, "i") },
      { tags: new RegExp(search, "i") },
    ];
  }

  const sortQuery =
    sort === "top" ? { upvotes: -1 } : { createdAt: -1 };

  const posts = await InterviewPrep.find(query)
    .populate("createdBy", "fullName")
    .sort(sortQuery);

  res.json(posts);
};

/* UPDATE (AUTHOR ONLY) */
export const updatePost = async (req, res) => {
  const post = await InterviewPrep.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Not found" });

  if (post.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not allowed" });
  }

  ["title", "content", "type", "company", "role", "tags"].forEach(
    (f) => {
      if (req.body[f] !== undefined) post[f] = req.body[f];
    }
  );

  await post.save();
  res.json(post);
};

/* SOFT DELETE (AUTHOR) */
export const deletePost = async (req, res) => {
  const post = await InterviewPrep.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Not found" });

  if (post.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not allowed" });
  }

  post.isHidden = true;
  await post.save();
  res.json(post);
};

/* ADMIN HIDE / UNHIDE */
export const toggleHidePost = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  const post = await InterviewPrep.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Not found" });

  post.isHidden = !post.isHidden;
  await post.save();
  res.json(post);
};

/* UPVOTE */
export const toggleUpvote = async (req, res) => {
  const post = await InterviewPrep.findById(req.params.id);
  const idx = post.upvotes.indexOf(req.user._id);

  idx === -1
    ? post.upvotes.push(req.user._id)
    : post.upvotes.splice(idx, 1);

  await post.save();
  res.json(post);
};
