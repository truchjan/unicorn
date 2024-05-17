package cz.truchjan.unicorn.service;

import cz.truchjan.unicorn.exception.ResourceNotFoundException;
import cz.truchjan.unicorn.model.Link;
import cz.truchjan.unicorn.repository.LinkRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class LinkServiceImpl implements LinkService {

	private static final String LINK_NOT_FOUND = "Link not found";

	private final LinkRepository linkRepository;

	private final HistoryService historyService;

	@Override
	public List<Link> getAllLinks() {
		return linkRepository.findAll();
	}

	@Override
	public ResponseEntity<Link> getLinkById(Long id) throws ResourceNotFoundException {
		return ResponseEntity.ok().body(linkRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(LINK_NOT_FOUND)));
	}

	@Override
	public ResponseEntity<Link> addLink(Link link) {
		return ResponseEntity.status(HttpStatus.CREATED).body(linkRepository.save(link));
	}

	@Override
	public ResponseEntity<Link> updateLink(Long id, Link linkUpdated) throws ResourceNotFoundException {
		Link link = linkRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(LINK_NOT_FOUND));

		link = historyService.addHistory(link, linkUpdated);
		link.setName(linkUpdated.getName());
		link.setUrl(linkUpdated.getUrl());
		if(linkUpdated.getImage() != null) link.setImage(linkUpdated.getImage());
		if(linkUpdated.getDescription() != null) link.setDescription(linkUpdated.getDescription());
		link.setAvailableFirefox(linkUpdated.isAvailableFirefox());
		link.setAvailableChrome(linkUpdated.isAvailableChrome());
		link.setActive(linkUpdated.isActive());
		link.setNewTab(linkUpdated.isNewTab());

		return ResponseEntity.ok().body(linkRepository.save(link));
	}

	@Override
	public ResponseEntity<?> deleteLink(Long id) throws ResourceNotFoundException {
		Link link = linkRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(LINK_NOT_FOUND));
		linkRepository.delete(link);
		return ResponseEntity.ok().build();
	}
}
