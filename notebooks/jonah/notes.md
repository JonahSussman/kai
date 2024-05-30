There are a couple of problems that I'm trying to solve


## Solution 1

Can randomly apply the code diffs and see what gets solved

**Cons:**
- 2^n unless we find a better way
- Analysis runs are too slow for now


## Solution 2

Ask the llm for a natural language summary

**Cons:**
- Another llm call (minor in the grand scheme of things)
- May or may not spit out correct summary


## Solution 3

Cascading changes as well? code touching

**Cons:**
- Complex
- Assumes that its like java -> java. Small changes


"""
load the test data into the in memory store

ok so what we need to do is actually make the incident store even MORE
general... I need to be able to quickly swap out what data is inside it and how
the solutions are stored and generated...

I think this needs a refactor... again... ugh

cause what I really want is a system for rapid prototyping.

Fundamentally, an incident store needs to ingest new reports and handle spitting
out "Solutions". The real thing is that how we store the data nd how we find the
solutions needs to rapidly evolve. There's a lot of common functionality though


Kai has two main "inputs":
- Incident Reports
- Requests for Solutions

"""